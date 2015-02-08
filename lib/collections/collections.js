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
		if (occupation === 'startup'){
			var profile = {
				'profile.type': occupation,
				'profile.companyName': '',
				'profile.url': '',
				'profile.angelList': '',
				// 'profile.logo': ''
			};
		} else {
			var profile = {
				'profile.type': occupation,
			};
		}
		Meteor.users.update( {_id: this.userId}, {$set: profile});

	},
	edit: function(profile){
			Meteor.users.update({_id: this.userId}, {$set: profile});
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

// function update(profile){
// 	console.log('update called');
// 	Meteor.users.update({_id: this.userId}, {$set: profile});
// }

// var result = request.getSync("https://meteor.com/meteor-logo.png", {
//     encoding: null
// });

// var buffer = result.body;


// function a(){
// 	var url = 'https://angel.co/storefront'
// 	request(url, function(err, resp, body) {
// 	    if (err)
// 	        throw err;
// 	    $ = cheerio.load(body);
// 	    // TODO: scraping goes here!
// 	    var image = $('.main.standard.g-lockup.larger .photo img')['0']['attribs']['src'];
// 	    console.log(image);
// 	    return image;
// 	});
// }

// console.log(a())






