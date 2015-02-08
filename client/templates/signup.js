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