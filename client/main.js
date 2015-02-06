// Template.investors.helpers({
//   startup: function() {
//     return Meteor.users.findOne({'profile.type': 'startup'});
//   },
// });

Meteor.subscribe("userData");
Meteor.subscribe("matches");
Meteor.subscribe("chat");

Template.main.rendered = function(){
  $('.ui.sidebar').sidebar('attach events', '.item');
	$('.ui.dropdown').dropdown();
};

Template.chat.helpers({
	'messages': function(){
		return Chat.find({match: this.matchId});
	},
	'senderName': function(sender){
		return Meteor.users.findOne(sender).profile.name;
	}
})

Template.chat.events({
	'submit form': function(e, template){
		e.preventDefault();

		var $body = $(e.target).find('[name=message]');
    var message = {
      match: this.matchId,
      line: $body.val()
    };

		Meteor.call('sendMessage', message, function(error, result){
			if (error) {
			  return throwError(error.reason);			
			} else {
				$body.val('');
			}
		});
	}
});

Template.matches.helpers({
	'matches': function(){
		if (Meteor.user().profile.type === 'startup') {
			return Matches.find({'startup': Meteor.userId()});
		} else {
			return Matches.find({'investor': Meteor.userId()});
		}
	},

	'getUser': function(){
		var type = (Meteor.user().profile.type === 'startup') ? this.investor : this.startup;
		return Meteor.users.findOne(type);
	}
});

// Template.startups.events({
// 	'click .meet': function(e, template){
// 		Meteor.call('meet', template.data.title._id, function(error, result) {
// 			if (error)
// 			  return throwError(error.reason);
// 		});
// 	},
// 	'click .pass': function(e, template){
// 		Meteor.call('pass', template.data.title._id, function(error, result) {
// 			if (error)
// 			  return throwError(error.reason);
// 		});
// 	}
// });


// Template.investors.events({
// 	'click .meet': function(e, template){
// 		Meteor.call('meet', template.data.title._id, function(error, result) {
// 			if (error)
// 			  return throwError(error.reason);
// 		});
// 	},
// 	'click .pass': function(e, template){
// 		Meteor.call('pass', template.data.title._id, function(error, result) {
// 			if (error)
// 			  return throwError(error.reason);
// 		});
// 	}
// });

//==============

Template.signup.events({
	'submit form': function(e, template){
		e.preventDefault();

    var user = {
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val()
    };
		
		// TODO: validation
		Accounts.createUser({
			email: user.email,
			password: user.password,
			profile: {
				type: null,
				name: null,
				meet: [],
				pass: [],
				match: []
			}
		});

		Router.go('occupation');
	}
});


Template.login.events({
	'submit form': function(e, template){
		e.preventDefault();
    var user = {
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val()
    };
    Meteor.loginWithPassword(user.email, user.password, function(error){
			if (error){
      	console.log(error.reason);
      } else {
      	pickUser();
      }
    });

	}
});

Template.occupation.events({
	'click .startup': function(){
		Meteor.call('setOccupation', 'startup', function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
		pickUser();
	},
	'click .investor': function(){
		Meteor.call('setOccupation', 'investor', function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
		pickUser();
	}

});

Template.main.events({
	'click .meet': function(e, template){
		Meteor.call('meet', template.data._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
			pickUser();
		});
	},
	'click .pass': function(e, template){
		Meteor.call('pass', template.data._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
			pickUser();
		});
	}
});


function pickUser(){
	// Return a user whom the current user has not seen before.
	var profile = Meteor.user().profile;
	var type = (profile.type === 'investor') ? 'startup' : 'investor';
	var user = _.find(Meteor.users.find({'profile.type': type}).fetch(), function(user){
		return !_.contains(profile.meet.concat(profile.pass), user._id);
	});
	Router.go('/main/' + user._id);
};


























