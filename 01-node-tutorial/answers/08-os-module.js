const os = require('os');

console.log('Free memory: ', os.freemem(), 'bytes');
console.log('Total memory: ', os.totalmem(), 'bytes');
console.log('User info: ', os.userInfo());
console.log('Platform: ', os.platform());

const currentOS = {
	name: os.type(),
	release: os.release(),
	totalMe: os.totalmem(),
	freeMem: os.freemem(),
};

console.log(currentOS);
