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