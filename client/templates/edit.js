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