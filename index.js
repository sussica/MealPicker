const express = require('express');
const app = express();
const port = 1106;
var path = require('path');

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
        /// to process the request with position information for clients
    })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





