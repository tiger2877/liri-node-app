/*-- Liri-Node-App -->
<!-- ================================================================ -->
<!-- Make it so liri.js can take in one of the following commands:    -->
<!-- 1. concert-this <artist/band name here>                          -->
<!-- 2. spotify-this-song '<song name here>'                          -->
<!-- 3. movie-this '<movie name here>'                                -->
<!-- 4. do-what-it-says                                               -->
<!-- ================================================================ -->*/

//require .env file
require("dotenv").config();

// Require request (https://www.npmjs.com/package/request)
var request = require("request");

// Require Moment (https://www.npmjs.com/package/moment)
var moment = require("moment");

// As always, we grab the fs package to handle read/write.
var fs = require('fs');          

// Like key page
var keys = require('./keys.js');

// initialize Spotify
var Spotify = require('node-spotify-api');

// Store all of the arguments in a variable
var nodeArgs = process.argv;

// Actions (i.e. "spotify-this-song", "movie-this", "do-what-it-says")
var action = process.argv[2];

// Create an empty variable for holding the movie or song name
var userInput = "";

// Movie URL
var movieUrl;

/* Direct which function gets run
--------------------------------------------- */

switch (action) {

  case "concert-this":
  setInput();
  concertThis(userInput);
  break;

  case "spotify-this-song":
  setInput();
  spotifyThis(userInput);
  break;

  case "movie-this":
  setInput();
  movieThis(userInput);
  break;

  case "do-what-it-says":
  doThis();
  break;

  default:
  console.log("Sorry, I don\'t understand that. Try one of these commands: 'concert-this', spotify-this-song', 'movie-this', 'do-what-it-says'");
}

/* Functions
--------------------------------------------- */

// Set name of media type
// Handle movies or songs with multiple words
// Set default if no songs or movies are entered

function setInput() {
  
  // Here we create a for-loop that starts with **3** so we skip the path, node command, and our commands from the command line
  // We will use this for loop to build an array of numbers.

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      userInput = userInput + "+" + nodeArgs[i];
    }
    else {
      userInput += nodeArgs[i];
    }
  }

  // Pass default for Bands in Town Artist Events API
  if (action === "concert-this" && nodeArgs.length <= 3) {
    concertUrl = "https://rest.bandsintown.com/artists/ladygaga/events?app_id=codingbootcamp";
  }
  else {
    concertUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
  }

  // Pass default for Spotify API
  if (action === "spotify-this-song" && nodeArgs.length <= 3) {
    userInput = "The+Sign+Ace+of+Base"
  }

  // Pass default for OMDB API
  if (action === "movie-this" && nodeArgs.length <= 3) {
    movieUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
  } 
  else {
    movieUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  }

}  

// Concert Function (Bands in Town Artist Events API)
function concertThis(){
console.log(`Searching for...${userInput}'s next show... `)
   // Then create a request to the movieUrl
   request(concertUrl, function(error, response, body) {
    
    // If the request is successful
    if (!error && response.statusCode === 200) {

      //capture data and use JSOn to format
      var concertData =  JSON.parse(body);

      if (concertData.length >0){
        for (i=0; i <1; i++) {

        //moment.js to format date to mm/dd/yyyy
        let venueDate = moment(concertData[i].datetime).format("MM/DD/YYYY");

        // Log concert info to console
        console.log(`
         ------------------------------------------  
          Venue Name: ${concertData[i].venue.name}
          Venue City: ${concertData[i].venue.city}, ${concertData[i].venue.country}
          Event Date: ${venueDate}
         ------------------------------------------
        `);
        }
      }
      else {
          console.log("Bands or concert not found.")
      }

      // Write concert info to log.txt
      // fs.appendFile('log.txt', "test", 'utf8', function (err) {
      //   if (err) {
      //     return console.log("Error occurred: " + err);
      //   }
      // });
    }
  });
}

// Spotify Function (Spotify API)
function spotifyThis(userInput) {

  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: userInput }, function(error, data) {
    if (error) {
      return console.log('Error occurred: ' + err);
    } else {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        
        // Log song info to console
        console.log(
      `----------------------------------------
        Song: ${songData.name}
        Artist: ${songData.artists[0].name}  
        Preview URL: ${songData.preview_url}
        Album: ${songData.album.name}
       ----------------------------------------
        `);
        
        // Write song info to log.txt
        fs.appendFile('log.txt', "--------------Song: " + songData.name + "--------------" + "\n" + "Artist: " + songData.artists[0].name + "\n" + "Preview URL: " + songData.preview_url + "\n" + "Album: " + songData.album.name + "\n" + "\n", 'utf8', function (err) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
        });
      }
    }
  });
}

// Movie Function (OMDB API)
function movieThis(){
  
  // Then create a request to the movieUrl
  request(movieUrl, function(error, response, body) {
    var movieData =  JSON.parse(body);

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Log movie info to console
     
  console.log(
 `-------------------------------------------------------------------------  
  * Title: ${movieData.Title}
  * Release Year: ${movieData.Year} 
  * IMDB Rating: ${movieData.Ratings[0].Value}  
  * Rotten Tomatoes: ${movieData.Ratings[1].Value}
  * Country of production: ${movieData.Country}
  * Language: ${movieData.Language}
  * Plot: ${movieData.Plot} 
  * Actors: ${movieData.Actors} 
  -------------------------------------------------------------------------  
  `)

      // Write movie info to log.txt
      fs.appendFile('log.txt', "--------------Movie--------------" + "\n" + "Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\n" + "Country of production: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "\n", 'utf8', function (err) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
      });
    }
  });
}

// Do what it says function
function doThis(){
  fs.readFile('random.txt', "utf8", function(error, data){
    if (error) {
      return console.log("Error occurred: " + err);
    } else {
      var content = data.split(',');
      var userInput = content[1].replace(/^"(.+(?="$))"$/, '$1');
      spotifyThis(userInput);
    }
  });
}
