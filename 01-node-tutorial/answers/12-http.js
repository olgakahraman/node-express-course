const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.end('Welcome to our home page!\n');
	}
	if (req.url === '/about') {
		res.end('Hello! This is out about page!\n');
	} else {
		res.end('Oops! page not found!\n');
	}
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
