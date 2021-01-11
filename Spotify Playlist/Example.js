'use strict'
const prompt = require('prompt-sync')();
var thesaurus = require("thesaurus");
var nodemailer = require('nodemailer');
var randomWords = require('random-words');
var secretToken = "YOUR_TOKENx"
var cityName = 'Stockholm'
var country = "SE"
var Promise = require('bluebird')
  , http = require('http')
  , request = require('request')
  , url = require('url')
  var token = "Bearer "+secretToken

var s = http.createServer(function(req, res) {
  res.statusCode = 200
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(req.headers))
})
var userEmail = prompt('What is your email?: ')

function weatherRequester() {
    var href = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+', '+country+"&appid=13550ecafbcc3d603bf7d15a94992c27";
    this.request = Promise.promisifyAll(
      request.defaults({
        uri: href
      })
    );
  }


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quantumalbum@gmail.com',
      pass: 'wizardHarry'
    }
  });
  

var weatherPool = new weatherRequester();
var count = 0;
weatherPool.request.get({headers:{ "Authorization":token}}, function(err, res, body) {

    if (err) {
        console.log(err)
    } else if (body) {
        var weather = JSON.parse(body);
       var query = weather.weather[0].main;
       var quantumQuery = query
            if (query == "undefined") {
                console.log("undefined");
            }
        function spotifyRequester() {
            var href = "https://api.spotify.com/v1/search?q={"+quantumQuery+"}&hipster=false&type=album&limit=50&offset=1";
              request.headers = { "Authorization":token}
            this.request = Promise.promisifyAll(
              request.defaults({
                uri: href
              })
            );
          }
        


          var pool = new spotifyRequester();

        pool.request.get({headers:{ "Authorization":token}}, function(err, res, body) {
    
            if (err) {
              console.log('FAIL', err.message)
            } else if (body) {
                function isAlbum(value) {
                    return value.type == 'album';
                  }
                  var album = JSON.parse(body)
                  if (album.error) {
                      console.log(album.error.message)
                      return;
                  }
                  var completed = false;
                //   let filtered = album.albums.filter(item => item.type == "album");
                  var filteredAlbums = album.albums.items.filter(isAlbum)
                  var url = "https://open.spotify.com/album/"+filteredAlbums[Math.floor(Math.random() * +filteredAlbums.length)].id+""
                  console.log("Check your inbox. Your quantum album awaits!");
                  var mailOptions = {
                      from: 'quantumalbum@gmail.com',
                      to: userEmail,
                      subject: 'Here is your Quantum Album',
                      text: 'In '+cityName+' the weather is '+weather.weather[0].description+', so listen to this album, and have a great day.  '+url
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        
                      if (error) {
                        console.log(error);
                        return;
                    } else {
                        completed = true
                        return;
                      }
                      if (completed) {
                          return
                      }

                    });
            }
        });
    }
});




