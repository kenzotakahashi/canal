// Router.configure({
//   layoutTemplate: 'layout',
//   // loadingTemplate: 'loading',
//   // notFoundTemplate: 'notFound',
//   // waitOn: function() { return Meteor.subscribe('posts'); }
// });



// Router.route('/', {
// 	name: 'Investors',
// 	data: function() { return Investors.findOne({check: false}); }
// });

Router.route('/dummy', function() {
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

Router.route('/', {name: 'top'});
Router.route('/signup', {name: 'signup'});
Router.route('/login', {name: 'login'});
Router.route('/occupation', {name: 'occupation'});
Router.route('/main/:_id', {
	name: 'main',
	data: function() { return Meteor.users.findOne(this.params._id); }
});


Router.route('/matches', {
	name: 'matches',
});


Router.route('/chat/:_id', {
  name: 'chat',
  data: function() { return {matchId: this.params._id}; }
});


getUser = function(type){
	// Return a user whom the current user has not seen before.
	var profile = Meteor.user().profile;
	return _.find(Meteor.users.find({'profile.type': type}).fetch(), function(user){
		return !_.contains(profile.meet.concat(profile.pass), user._id);
	});
};


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      // this.render('accessDenied');
      this.redirect('/');
    }
  } else {
    this.next();
  }
}

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'main'});

