var http = require('http');
var url = require('url');
var fs = require('fs');


//create a server object:
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    //to see if the request is from server or clients 
    if(q.pathname =='/'){
        fs.readFile('home.html', function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }  
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end(); //end the response
        });        
        //CREATE FORM
    }else{
        res.end();
        //DO EVERYTHING NEED
    }
   
}).listen(8080); //the server object listens on port 8080