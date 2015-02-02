Meteor.publish("matches", function(){
	return Matches.find();
});

Meteor.publish("userData", function (){
  // if (this.userId) {
  //   return Meteor.users.find({_id: this.userId},
  //                            {fields: {'other': 1, 'things': 1}});
  // } else {
  //   this.ready();
  // }
  return Meteor.users.find();
});

Meteor.methods({
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
	}
});

Meteor.methods({
	pass: function(userId){
		Meteor.users.update( { _id: this.userId }, { $push: { 'profile.pass': userId }} );
	}
});



if (Meteor.users.find().count() === 0){
	for (var i = 0; i < 10; i++){
		Accounts.createUser({
			email: 'investor' + i + '@gmail.com',
			password: 'pass' + i,
			profile: {
				type: 'investor',
				name: 'investor ' + i,
				meet: [],
				pass: [],
				match: []
			}
		});
	}

	for (var i = 0; i < 10; i++){
		Accounts.createUser({
			email: 'startup' + i + '@gmail.com',
			password: 'pass' + i,
			profile: {
				type: 'startup',
				name: 'startup ' + i,
				meet: [],
				pass: [],
				match: []				
			}
		});
	}
}



