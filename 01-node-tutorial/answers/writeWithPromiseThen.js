const { writeFile, readFile } = require('fs').promises;

writeFile(
  './temp.txt',
  'Adding one more line1 temp.txt \n',
  { encoding: 'utf8', flag: 'a' }
)
  .then(() => {
    return writeFile(
      './temp.txt',
      'Adding one more line2 temp.txt \n',
      { encoding: 'utf8', flag: 'a' }
    );
  })
  .then(() => {
    return writeFile(
      './temp.txt',
      'Adding one more line3 temp.txt \n',
      { encoding: 'utf8', flag: 'a' }
    );
  })
  .then(() => {
    console.log('All lines were written successfully!');
    return readFile('./temp.txt', 'utf8');
  })
  .then(data => {
    console.log('File contains:');
    console.log(data);
  })

  .catch(error => {
    console.log('An error occurred: ', error);
  });
