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