const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', name => {
  console.log(`Hi, ${name}`);
});

emitter.on('bye', () => {
  console.log('Bye bye, see you tomorrow');
});

const waitForEvent = () => {
  return new Promise(resolve => {
    emitter.on('happens', msg => resolve(msg));
  });
};

const doWait = async () => {
  console.log('Waiting for an event...');
  const msg = await waitForEvent();
  console.log('We got an event! Here it is: ', msg);
};

emitter.emit('greet', 'Olga');
emitter.emit('bye');

doWait();

setTimeout(() => {
  emitter.emit('happens', 'Hello World!');
}, 4000);
