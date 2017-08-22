
var key = require("./key.js");
var request = require("request");

var nodeArgs = process.argv;


// truthy vs falsey

var command = null;
var movieName = "";

// Get arguments
if ( nodeArgs.length < 5 ) {

	command = nodeArgs[2];


	if (command === "moviethis"){


		// search movie
		moviethis(nodeArgs[3])
	}

	else if (command === 'spotify') {
		console.log("spotify");
		// spotify
		 spotify();
	}
	else if (command === 'twitter') {
		// twitter
		 twitter();
	}

}

	else if ( nodeArgs > 3 ) {
	// moviestuff
	//moviethis//

	for (var i = 2; i < nodeArgs.length; i++) {
		console.log( nodeArgs[i] )

	  if (i > 2 && i < nodeArgs.length) {
	  	console.log( nodeArgs[i] )
	    movieName = movieName + "+" + nodeArgs[i];


	  }

	  else {

	    movieName += nodeArgs[i];

	  }
	}
	command = 'moviethis'
}


/*modify command*/





function moviethis(movieName) {
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {
	if (error) {console.log(error)}
	 if (!error && response.statusCode === 200) {
	 	var movie = JSON.parse(body)

console.log("Release Year: " + movie.Year);
console.log("Movie Title: " + movie.Title);
console.log("Rating: " + movie.Rated);
console.log("imdbRating: " + movie.Ratings[0].Value);
console.log("rotten tomatoes: " + movie.Ratings[0].Value);
console.log("Country: " + movie.Country);
console.log("Language: " + movie.Language);
console.log("Plot: " + movie.Plot);
console.log("Actors: " + movie.Actors);

  }
});
}
//     //


//spotify//
function spotify() {
	var Spotify = require('node-spotify-api');

	var spotify = new Spotify({
	  id: (key.spotifyKeys.client_Id),
	  secret: (key.spotifyKeys.client_secret)
	})

	spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	console.log(" album name: " + data.tracks.items[1].album.name);
	console.log(" preview_url: " + data.tracks.items[1].preview_url);
	console.log(" artists name: " + data.tracks.items[1].album.artists[0].name);
	console.log(" name: " + data.tracks.items[1].name);

	});
}
//    //


//twitter//
function twitter() {
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: key.twitterKeys.consumer_key,
  consumer_secret: key.twitterKeys.consumer_secret,
  access_token_key: key.twitterKeys.access_token_key,
  access_token_secret: key.twitterKeys.access_token_secret
});

var params = {screen_name: 'yoggibear48'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	    console.log("tweets: " + tweets[0].text);


    }

});
}
///
