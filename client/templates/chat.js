Template.chat.helpers({
	'messages': function(){
		return Chat.find({match: this.matchId});
	},
	'senderName': function(sender){
		return Meteor.users.findOne(sender).profile.name;
	},
	'myLine': function(sender){
		return !! (sender === Meteor.userId());
	}
});

Template.chat.events({
	'submit form': function(e, template){
		e.preventDefault();

		var $body = $(e.target).find('[name=message]');
    var message = {
      match: this.matchId,
      line: $body.val()
    };

		Meteor.call('sendMessage', message, function(error, result){
			if (error) {
			  return throwError(error.reason);			
			} else {
				$body.val('');
			}
		});
	}
});