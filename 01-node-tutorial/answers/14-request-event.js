const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  const url = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  const name = url.searchParams.get('name') || 'Guest';
  res.end(`Welcome, ${name}!`);
});

server.listen(5001, () => {
  console.log('Server is listening on port 5001...');
});
