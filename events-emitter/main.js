const { events } = require('./config');
const Emitter = require('./emitter');

var emitter = new Emitter();

emitter.on(events.GREET, function(){
  console.log('say hi');
});

emitter.on(events.GREET, function(){
  console.log('say hi again!!');
});

emitter.emit(events.GREET);
