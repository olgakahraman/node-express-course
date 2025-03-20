const http = require('http');

const randomNumber = Math.floor(Math.random() * 100) + 1;
let message = 'Guess a number between 1 and 100';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const guess = new URLSearchParams(body).get('number');
      if (guess == randomNumber) {
        message = `Congratulations! You guessed the number ${randomNumber}`;
      } else if (guess < randomNumber) {
        message = 'The number is higher!';
      } else {
        message = 'The number is lower!';
      }
      res.writeHead(303, { Location: '/' });
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Game: Guess the Number</h1>
      <p>${message}</p>
      <form method="POST">
        <input type="number" name="number" min="1" max="100" required>
        <button type="submit">Submit</button>
      </form>
    `);
  }
});
server.on('request', req => {
  console.log('event received: ', req.method, req.url);
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
