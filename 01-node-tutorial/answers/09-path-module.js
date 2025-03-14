const path = require('path');

const myPath = path.join(
	'Users',
	'OLGA',
	'node-express-course',
	'01-node-tutorial',
	'answers'
);

console.log('My path:', myPath);
console.log('Directory:', path.dirname(myPath));
