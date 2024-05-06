// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 3000;
var comments = [];

var server = http.createServer(function (req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                res.end('404, Not Found.');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (pathname === '/addComment') {
        var comment = parseUrl.query;
        comments.push(comment);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                res.end('404, Not Found.');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            res.end(data);
        });
    }
});

server.listen(port, function () {
    console.log('server is listening on port ' + port);
});