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

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "88213826089-cnjhm0vtu513eb4mj3tsbvu4qbpur1bg.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "7zqd_l94_8D3ICBXJp8x2Yh1"
    }
  }
);

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
		profile = {
			type: null,
			location: '',
			description: '',
			meet: [],
			pass: [],
			match: [],
		}

    user.profile = merge_options(profile, options.profile);

  return user;
});


if (Meteor.users.find().count() === 0){
	for (var i = 0; i < 10; i++){
		Accounts.createUser({
			email: 'investor' + i + '@gmail.com',
			password: 'pass' + i,
			profile: {
				type: 'investor',
				name: 'investor ' + i,
				location: 'San Francisco',
				description: "I'm an Internet guy who believes in the triumph of humanity with a little help from technology. My current job is CEO of Jelly",
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
				companyName: 'startup ' + i,
				location: 'San Francisco',
				description: 'Dropbox is a free service that lets you bring your photos, docs, and videos anywhere and share them easily. Dropbox was founded in 2007 by Drew Houston and Arash Ferdowsi, two MIT students tired of emailing files to themselves to work from more than one computer.',
				url: 'http://dropbox.com',
				angelList: 'https://angel.co/dropbox',
				meet: [],
				pass: [],
				match: []				
			}
		});
	}
}



