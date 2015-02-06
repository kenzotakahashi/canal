Meteor.publish("matches", function(){
	return Matches.find();
});

Meteor.publish("chat", function(){
	return Chat.find();
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



