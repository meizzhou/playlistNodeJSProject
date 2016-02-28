
var http = require("http");
var fs = require("fs");
var YouTube = require('youtube-node');
var request = require('ajax-request');

var youTube = new YouTube();

youTube.setKey('AIzaSyABsq74cT6t68m7s29N7BRJhuq6aT7ZQRQ');
youTube.addParam('type','playlist');

//the artist that contains a list of singers
var artist = ["Justin Bieber", "Beyonce", "Jay-z"];

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
                /*
                for (var i = 0; i < list.items.length; i++) {
                    var playList = list.items[i].id.playlistId;
                    
                    //console.log(playList);
                    array[artist[k]].push(playList);
                    //console.log(artist[k]);
                }*/
                // console.log(artist[k]);
                // console.log(array[artist[k]]);
            }
        });
    })(k);
}

// ajax post
/*
var params = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}'; 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ajax = new XMLHttpRequest();
ajax.open("POST", "localhost:8080", true);
ajax.send(params); */
/*
request.post({
  url: 'localhost:8080',
  data: {"firstName":"John"},
  headers: {}
});
*/
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        array: array[artist[0]],
        artist: artist
    });
    
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   // response = {
   //     value:req.query.artist
   // };
   // console.log(response);
   // res.end(JSON.stringify(response));
   value:req.query.artist
   res.render('index', {
        array: array[req.query.artist],
        artist: artist
    });
})

app.listen(8080);
//console.log('8080 is the magic part');


//assoc_array = ["JB":"12234", "MC":"34556"]
//dropdown-> assoc_array["JB"] -> youtube URL -> front-end
// fs.readFile('index.html', function (err, html) {
//     http.createServer(function(request, response) {
//       response.writeHead(200, {"Content-Type": "text/html"});
//       //response.write("Hello World");
//       response.write('<!doctype html>\n<html lang="en">\n' + 
//     '\n<meta charset="utf-8">\n<title>Single playlist module</title>\n' + 
//     '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
//     '\n\n<h1>Euro 2012 teams</h1>\n' + 
//     '\n\n');



//       response.end();



//     }).listen(8888);


// });



/*
// get walking directions from central park to the empire state building
var http = require("http");
    url = "http://maps.googleapis.com/maps/api/directions/json?origin=Central Park&destination=Empire State Building&sensor=false&mode=walking";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);
        route = data.routes[0];

        // extract the distance and time
        console.log("Walking Distance: " + route.legs[0].distance.text);
        console.log("Time: " + route.legs[0].duration.text);
    }); 
}); 

var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

youTube.search('World War z Trailer', 2, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
  }
});*/


