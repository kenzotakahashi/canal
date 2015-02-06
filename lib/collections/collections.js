// Investors = new Mongo.Collection('investors');
Matches = new Mongo.Collection('matches');
Chat = new Mongo.Collection('chat');

Meteor.methods({
	// home
	meet: function(userId){
		Meteor.users.update( { _id: this.userId }, { $push: { 'profile.meet': userId }} );
		if (_.contains(Meteor.users.findOne(userId).profile.meet, this.userId)){
			console.log('matched!');
			if (Meteor.user().profile.type === 'startup'){
				var startup = this.userId;
				var investor = userId;
			} else {
				var startup = userId;
				var investor = this.userId;		
			}
			var matchId = Matches.insert({
				startup: startup,
				investor: investor
			});
			Meteor.users.update({_id: this.userId}, {$push: {'profile.match': matchId}});
			Meteor.users.update({_id: userId},      {$push: {'profile.match': matchId}});
		}
	},
	pass: function(userId){
		Meteor.users.update( {_id: this.userId}, { $push: { 'profile.pass': userId }} );
	},
	setOccupation: function(occupation){
		Meteor.users.update( {_id: this.userId}, {$set: {'profile.type': occupation}});
	},

	//chat
	sendMessage: function(message){
		Chat.insert({
			match: message.match,
			sender: this.userId,
			line: message.line,
			createdAt: new Date(),
		});
	},

});