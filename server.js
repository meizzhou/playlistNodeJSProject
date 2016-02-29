/*
Meizhuo Zhou Node.js with Youtube api project
*/

// connects to youtube api
var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyABsq74cT6t68m7s29N7BRJhuq6aT7ZQRQ');
youTube.addParam('type','playlist');

// the artist array that contains a list of singers
var artist = ["Justin Bieber", "Beyonce", "Taylor Swift", "Guns And Roses", "Cold Play"];

// array contains key-value pair which is {artist name: playlist ID}, and playlist is also
// in an array
var array = {};

for (var k = 0; k < artist.length; k++) {

    (function(k){
        // youtube api search the specific artist and get the playlist
        youTube.search(artist[k], 1, function(error, result) {

            if (error) {
                console.log(error);
            }
            else {
                // gets one playlist for each singer
                var string = JSON.stringify(result, null, 1);

                var list = JSON.parse(string);
                
                // platList gets the platlist id from jason file youtube api returned
                var playList = list.items[0].id.playlistId;

                // array will store videos id that are in the playlist associated with the artists
                array[artist[k]] = [];

                // youtube api will pass 5 video ids for each playlist, can change it to other numbers
                youTube.addParam('maxResults',5);
                youTube.getPlayListsItemsById(playList, function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var videoString = JSON.stringify(result, null, 4);

                        var videosList = JSON.parse(videoString);

                        // Stores the list of video ids in the associative array associated with singer
                        for (var i = 0; i < videosList.items.length; i++) {
                            (function(i) {
                                array[artist[k]].push(videosList.items[i].contentDetails.videoId);

                            })(i);
                        }
                    }
                });
            }
        });

    })(k);
}

// connects to express module
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

// connects with style folder
app.use("/styles", express.static("views/styles"));

// pass the first singer in artist list, artist list and videos for first singer
// to the front end
app.get('/', function(req, res) {
    res.render('index', {
        array: array[artist[0]],
        artist: artist,
        artist_single: artist[0]
    });
    
})

// the front end will make a get request that sends the selected singer name
// gets the value and return the video ids for the selected singder
app.get('/process_get', function (req, res) {

   value:req.query.artist
   res.render('index', {
        array: array[req.query.artist],
        artist: artist,
        artist_single: req.query.artist
    });
})

app.listen(8080);
