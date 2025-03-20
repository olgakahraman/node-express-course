const fs = require('fs');

const readStream = fs.createReadStream(
  '../content/big.txt',
  {
    encoding: 'utf8',
    highWaterMark: 200,
  }
);

let counter = 0;

readStream.on('data', chunk => {
  counter++;
  console.log(`Chunk ${counter}:`, chunk);
});

readStream.on('end', () => {
  console.log(`Total chunks received: ${counter}`);
});

readStream.on('error', err => {
  console.error('Error reading file:', err);
});
