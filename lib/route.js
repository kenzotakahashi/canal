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


Router.route('/', {name: 'top'});
Router.route('/signup', {name: 'signup'});
Router.route('/login', {name: 'login'});
Router.route('/occupation', {name: 'occupation'});
Router.route('/matches', {name: 'matches'});
Router.route('/companyName', {name: 'companyName'});

Router.route('/main/:_id', {
	name: 'main',
	data: function() {
		var param = this.params._id;
		return ((param !== 'no-user') ? Meteor.users.findOne(param) : null);
	}
});

// id is a match id
Router.route('/chat/:_id', {
  name: 'chat',
  data: function() {
  	var match = Matches.findOne(this.params._id);
  	// get id of the conversation partner
  	if (Meteor.user().profile.type === 'startup'){
  		return {
  			matchId: match._id,
  			user: Meteor.users.findOne(match.investor).profile.name
  		};
  	} else {
  		return {
  			matchId: match._id,
  			user: Meteor.users.findOne(match.startup).profile.companyName
  		}
  	}

  }
});

Router.route('/profile', {
	name: 'profile',
});

Router.route('/edit', {
	name: 'edit',
});


// getUser = function(type){
// 	// Return a user whom the current user has not seen before.
// 	var profile = Meteor.user().profile;
// 	return _.find(Meteor.users.find({'profile.type': type}).fetch(), function(user){
// 		return !_.contains(profile.meet.concat(profile.pass), user._id);
// 	});
// };


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
Router.onBeforeAction(requireLogin, {only: ['main', 'matches', 'chat', 'profile', 'edit',]});

