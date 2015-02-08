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