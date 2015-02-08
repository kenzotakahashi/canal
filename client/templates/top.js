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