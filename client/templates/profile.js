Template.profile.rendered = function(){
  $('.ui.sidebar').sidebar('attach events', '.text .item');
};

Template.profile.helpers({
	'isStartup': function(){
		return !! (Meteor.user().profile.type === 'startup');
	}
});