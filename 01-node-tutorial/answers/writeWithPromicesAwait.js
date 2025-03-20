const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
  try {
    await writeFile(
      './temp.txt',
      'First line\n Second line \n Third line \n',
      'utf8'
    );
    console.log('File temp.txt was written successfully');
  } catch (err) {
    console.log.err('Error happened:', err);
  }
};

const reader = async () => {
  try {
    const data = await readFile('./temp.txt', 'utf8');
    console.log('File temp.txt contains:');
    console.log(data);
  } catch (err) {
    console.log('error happened:', err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
