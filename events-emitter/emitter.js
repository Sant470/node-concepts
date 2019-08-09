// function constructor to intialize events
function Emitter(){
  this.events = {}
}

// publish an event
Emitter.prototype.on = function(type, listener){
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}

// emits the event
Emitter.prototype.emit = function(type){
  if(this.events[type]){
    this.events[type].forEach((listener) => {
      listener();
    });
  }
}

module.exports = Emitter;
