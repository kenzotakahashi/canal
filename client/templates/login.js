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