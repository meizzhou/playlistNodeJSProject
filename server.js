
var http = require("http");
var fs = require("fs");
var YouTube = require('youtube-node');
var request = require('ajax-request');

var youTube = new YouTube();

youTube.setKey('AIzaSyABsq74cT6t68m7s29N7BRJhuq6aT7ZQRQ');
youTube.addParam('type','playlist');

//the artist that contains a list of singers
var artist = ["Justin%20Bieber", "Beyonce", "Taylor%20Swift"];

//the list that contains key-value pair which is {artist name: playlist ID}
var array = {};

for (var k = 0; k < artist.length; k++) {

    (function(k){
        youTube.search(artist[k], 1, function(error, result) {

            if (error) {
                console.log(error);
            }
            else {
                var string = JSON.stringify(result, null, 1);

                var list = JSON.parse(string);
                //console.log(string);
                var playList = list.items[0].id.playlistId;
                // array will store videos that are in the playlist associated with the artists
                array[artist[k]] = [];
                youTube.addParam('maxResults',5);
                youTube.getPlayListsItemsById(playList, function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //console.log(JSON.stringify(result, null, 4));
                        var videoString = JSON.stringify(result, null, 4);
                        //console.log(videoString);
                        
                        var videosList = JSON.parse(videoString);
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



var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use("/styles", express.static("views/styles"));

app.get('/', function(req, res) {
    res.render('index', {
        array: array[artist[0]],
        artist: artist,
        artist_single: artist[0]
    });
    
})

app.get('/process_get', function (req, res) {

   value:req.query.artist
   res.render('index', {
        array: array[req.query.artist],
        artist: artist,
        artist_single: req.query.artist
    });
})

app.listen(8080);
