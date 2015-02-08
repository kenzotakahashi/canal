// Template.investors.helpers({
//   startup: function() {
//     return Meteor.users.findOne({'profile.type': 'startup'});
//   },
// });

Meteor.subscribe("userData");
Meteor.subscribe("matches");
Meteor.subscribe("chat");



// ================ Chat ==============

Template.chat.helpers({
	'messages': function(){
		return Chat.find({match: this.matchId});
	},
	'senderName': function(sender){
		return Meteor.users.findOne(sender).profile.name;
	},
	'myLine': function(sender){
		return !! (sender === Meteor.userId());
	}
});

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

// ============== Matches ==============================

Template.matches.helpers({
	'matches': function(){
		if (Meteor.user().profile.type === 'startup') {
			return Matches.find({'startup': Meteor.userId()});
		} else {
			return Matches.find({'investor': Meteor.userId()});
		}
	},
	'getUser': function(){
		// 'this' is a match object
		if (Meteor.user().profile.type === 'startup') {
			return Meteor.users.findOne(this.investor).profile.name;
		} else {
			return Meteor.users.findOne(this.startup).profile.companyName;
		}
	}
});

Template.matches.events({
	'click .back': function(){
		pickUser();
	},
});

//============== Occupation ================================

Template.occupation.events({
	'click .startup': function(){
		Meteor.call('setOccupation', 'startup', function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
		Router.go('/companyName');
	},
	'click .investor': function(){
		Meteor.call('setOccupation', 'investor', function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
		pickUser();
	}

});

// ============ main =========================================

Template.main.rendered = function(){
  $('.ui.sidebar').sidebar('attach events', '.text .item');
};

Template.main.helpers({
	'isStartup': function(){
		return !! (Meteor.user().profile.type === 'startup');
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
	},
});

// =============== sidebar ==================================

Template.sidebar.events({
	'click .home': function(e, template){
	 	$(".ui.sidebar").sidebar("setting", {
	    onHidden: function () {
	    	pickUser();
	    }
		}).sidebar('hide');		
	},
	'click .logout': function(e, template){
	 	$(".ui.sidebar").sidebar("setting", {
	    onHidden: function () {
	    	Meteor.logout();
	    	Router.go('/');
	    }
		}).sidebar('hide');
	},
	'click .profile': function(e, template){
	 	$(".ui.sidebar").sidebar("setting", {
	    onHidden: function () {
	    	Router.go('/profile');
	    }
		}).sidebar('hide');
	},
});

Template.profile.rendered = function(){
  $('.ui.sidebar').sidebar('attach events', '.text .item');
};

// ============ Profile ===============================

Template.profile.helpers({
	'isStartup': function(){
		return !! (Meteor.user().profile.type === 'startup');
	}
});



// ============ Edit ===================================

Template.edit.helpers({
	'isStartup': function(){
		return !! (Meteor.user().profile.type === 'startup');
	}
});

Template.edit.events({
	'submit form': function(e){
		e.preventDefault();
		if (Meteor.user().profile.type === 'startup'){
			profile = {
				'profile.companyName': $(e.target).find('[name=name]').val(),
				'profile.location': $(e.target).find('[name=location]').val(),
				'profile.url': $(e.target).find('[name=url]').val(),
				'profile.angelList': $(e.target).find('[name=angelList]').val(),
				'profile.description': $(e.target).find('[name=description]').val(),
			};
		} else {
			profile = {
				// firstName: $(e.target).find('[name=firstName]').val(),
				// lastName: $(e.target).find('[name=lastName]').val(),
				'profile.location': $(e.target).find('[name=location]').val(),
				'profile.description': $(e.target).find('[name=description]').val(),				
			};			
		}
		Meteor.call('edit', profile, function(error, result) {
			if (error)
			  return throwError(error.reason);
			Router.go('profile');
		});
	}
});

// ============ top =========================

Template.top.events({
	'click .google': function(e, template){
		Meteor.loginWithGoogle({requestPermissions: ['email']}, function (error) {
		  if (error)
		    console.log(error);
		  else {

		  	if (Meteor.user().profile.type){
		  		pickUser();
		  	} else {
					Router.go('occupation');
		  	}
		  }
		});
	}
});

// ======== CompanyName ======================

Template.companyName.events({
	'submit form': function(e, template){
		e.preventDefault();
		profile = {
			'profile.companyName': $(e.target).find('[name=name]').val(),
		};
		Meteor.call('edit', profile, function(error, result) {
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

	Router.go('/main/' + ((user) ? user._id : 'no-user'));
};






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
				location: '',
				description: '',
				meet: [],
				pass: [],
				match: [],
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
	},
	// TODO: dupulication
	'click .google': function(e, template){
		Meteor.loginWithGoogle({requestPermissions: ['email']}, function (error) {
		  if (error)
		    console.log(error);
		  else {

		  	if (Meteor.user().profile.type){
		  		pickUser();
		  	} else {
					Router.go('occupation');
		  	}
		  }
		});
	}
});
















