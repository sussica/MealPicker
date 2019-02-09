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

        // TODO: if lat and lon are inappropriate send back a 400 with error message
        if(lat == undefined||lon == undefined){
        res.status(400);
        res.send('Rahul hates Marvel');
        return;}

        var category = requestJSON.category;
        //  handle no data sent
        var distance = requestJSON.distance == "-1" || requestJSON.distance == undefined ? 999999:requestJSON.distance * 1000;
        var pricelevel = requestJSON.pricelevel == "-1"||requestJSON.pricelevel == undefined? "":"&maxprice="+requestJSON.pricelevel;
        
        


        //doesn't have variable about rating in nearby search api
        //pagetoken?

        // filter returned results with this rating
        var pickedRating = requestJSON.rating;


        var APIkey = "AIzaSyAaQDVhgRZ-jKBkqQBBpGemUDfdrSrkxrs";
        var keyword = category==""? "food": category+"%20food";
        var URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/"+
        "json?key=" + APIkey + "&radius=" + distance + "&location=" + lat + "," + lon + "&keyword=" + keyword 
        + "&opennow=true"+pricelevel;

        console.log(URL);
        
        request(URL,
                 function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var results = JSON.parse(response.body).results;

                        // TODO: Filter results based on rating
                        results = results.filter(({ rating }) => rating >= pickedRating);

                        var count = results.length;
                        var pick = Math.floor(Math.random() * count);               

                        res.json(results[pick]);
                    }
                }
            )
    })

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))





