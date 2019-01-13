var http = require('http');
var url = require('url');
var fs = require('fs');


//create a server object:
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    // to process the request with position information for clients
    if(q.pathname =='/position'){
        //process the request restaurants and send the suggestion back
        res.end();
    
        //else handling sending back resources to clients
    } else {

        //to access the home.html just by '/'
        if (q.pathname == '/') {
            req.url = '/home.html';
        }

        fs.readFile(req.url.substring(1), function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end(); //end the response
        });       
    }
}).listen(8080); //the server object listens on port 8080




