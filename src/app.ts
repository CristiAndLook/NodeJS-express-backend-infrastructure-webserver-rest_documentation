import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url);
    // Example server side rendering
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<html>');
    // res.write('<head><title>My First Page</title></head>');
    // res.write('<body><h1>Hello from my Node.js Server!</h1></body>');

    // const data = { name: 'Max', age: 28 };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if (req.url === '/') {

        const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlFile);
        return res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Page not found</h1></body>');
        return res.end();
    }


});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
