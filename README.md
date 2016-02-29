Description of the application:
-------------------------------
A node.js application consisting of a single playlist module with YouTube’s public search API: 
https://developers.google.com/youtube/v3/docs/search

Basic features:
---------------
- Simple playlist of finite set of videos.
- A dropdown to choose from different artists. 
Eg : List : [Elton John, Stevie Wonder, Frank Sinatra, Louis Armstrong];
- By default the first item in the dropdown should be selected and the corresponding playlist should be rendered server side. Change in selection should trigger client side updates.

How to run the application:
---------------------------
If you have not installed node.js
please go to https://nodejs.org/en/download/ and download

open terminal
type the following commend:

cd <-the directory you stored the project->

cd playlistNodeJSProject

node server.js

open your favorite browser and enter: 127.0.0.1:8080

Author:
-------
Meizhuo Zhou

Design decisions:
-----------------

This website follows the flat and minimalist design style.
For the color and font of the website, I used Google Material Design's color and font.
The color and font are related to youtube's color theme.
Since this is an application for getting youtube's videos, I believe the colors match the purpose of tha app.

For the layout of the website, I created a fixed top bar containing title and dropdown menu, this way
user will be able to choose other artists from the dropdown menu even when they are in the middle of the page.
The videos are displayed in a list video, I didn't put the title of the video since the youtube video already has
the title on the video.

If I had more time, I would create a load more button and load more videos if we set the list to more than 5 videos


Thoughts:
-------------

The major difficulty I had was learning about youtube api and connect the api with node.js.
In the begining I was only able to get the videos ids from search result, I later discovered that I can add
parameters and filter only the playlists. Then I used the getPlayListsItemsById from youtube api to get the items in the playlist.


