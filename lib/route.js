Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'notFound',
  // waitOn: function() { return Meteor.subscribe('posts'); }
});



// Router.route('/', {
// 	name: 'Investors',
// 	data: function() { return Investors.findOne({check: false}); }
// });

Router.route('/', function() {
	if (Meteor.user()){
		if (Meteor.user().profile.type === 'startup'){
			this.render('startups', {data: {
				title: getUser('investor')
			}});
		} else {
			this.render('investors', {data: {
				title: getUser('startup')
			}});
		}
	} else {
		this.render('hello');
	}
});

Router.route('/matches', {
	name: 'matches',
});


getUser = function(type){
	// Return a user whom the current user has not seen before.
	var profile = Meteor.user().profile;
	return _.find(Meteor.users.find({'profile.type': type}).fetch(), function(user){
		return !_.contains(profile.meet.concat(profile.pass), user._id);
	});
};




