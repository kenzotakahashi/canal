// Template.investors.helpers({
//   startup: function() {
//     return Meteor.users.findOne({'profile.type': 'startup'});
//   },
// });

Meteor.subscribe("userData");
Meteor.subscribe("matches");

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
		return Meteor.users.findOne(type).profile.name;
	}
});

Template.startups.events({
	'click .meet': function(e, template){
		Meteor.call('meet', template.data.title._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
	},
	'click .pass': function(e, template){
		Meteor.call('pass', template.data.title._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
	}
});


Template.investors.events({
	'click .meet': function(e, template){
		Meteor.call('meet', template.data.title._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
	},
	'click .pass': function(e, template){
		Meteor.call('pass', template.data.title._id, function(error, result) {
			if (error)
			  return throwError(error.reason);
		});
	}
});





