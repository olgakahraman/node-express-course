const { readFileSync, writeFileSync } = require('fs');

const filePathForWrite = './temporary/textA.txt';
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

console.log(first, second);

writeFileSync(filePathForWrite, 'This is my first line.\n');
writeFileSync(
	filePathForWrite,
	'This is my second line.\n',
	{
		flag: 'a',
	}
);
writeFileSync(
	filePathForWrite,
	'This is my third line.\n',
	{
		flag: 'a',
	}
);
