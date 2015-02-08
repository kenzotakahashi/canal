Meteor.subscribe("userData");
Meteor.subscribe("matches");
Meteor.subscribe("chat");


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

// ========= Helper function


pickUser = function(){
	// Return a user whom the current user has not seen before.
	var profile = Meteor.user().profile;
	var type = (profile.type === 'investor') ? 'startup' : 'investor';
	var user = _.find(Meteor.users.find({'profile.type': type}).fetch(), function(user){
		return !_.contains(profile.meet.concat(profile.pass), user._id);
	});

	Router.go('/main/' + ((user) ? user._id : 'no-user'));
};

