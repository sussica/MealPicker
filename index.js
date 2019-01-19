const express = require('express');
const app = express();
const port = 1106;
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Call back function for handling the first request
// the first request from the client: load the page home.html, as well as
// handle things for main.css and main.js
// to access the home.html just by '/'
app.route(['/main.css', '/main.js', '/home.html', '/'])
        .get((req, res) => {
            if (req.url == '/') {
                req.url = '/home.html';
            }
            res.sendFile(path.join(__dirname + req.url));
        });

app.route('/')
    .post(function (req, res) {
        var requestJSON = req.body;
        console.log(req);
        var lat = requestJSON.latitude;
        var lon = requestJSON.longitude;
        var radius = 1000;
        var APIkey = "AIzaSyAaQDVhgRZ-jKBkqQBBpGemUDfdrSrkxrs";
        var keyword = "food";
        var URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/"+
        "json?key=" + APIkey + "&radius=" + radius + "&location=" + lat + "," + lon + "&keyword=" + keyword;
        
        request(URL, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var results = JSON.parse(response.body).results;
                var count = results.length;
                var pick = Math.floor(Math.random() * count);               

                res.json(results[pick]);
            }
        })

    })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





