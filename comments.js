// Create web server
// 1. Create a web server object
// 2. Listen on a port
// 3. Handle requests
// 4. Send response
// 5. Read from files
// 6. Write to files

// 1. Create web server object
const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.path;
    const method = req.method;

    if (path === '/comments' && method === 'GET') {
        // 5. Read from files
        fs.readFile('comments.json', 'utf-8', function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            }
        });
    } else if (path === '/comments' && method === 'POST') {
        // 6. Write to files
        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });

        req.on('end', function () {
            const comment = querystring.parse(body);
            fs.readFile('comments.json', 'utf-8', function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.end('Server error');
                } else {
                    const comments = JSON.parse(data);
                    comments.push(comment);
                    fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                        if (err) {
                            res.statusCode = 500;
                            res.end('Server error');
                        } else {
                            res.statusCode = 201;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(comment));
                        }
                    });
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

// 2. Listen on a port
server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});

