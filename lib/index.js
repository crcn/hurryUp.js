var comerr = require("comerr");

module.exports = function(timedCallback, timeout) {


  timeout  = timeout || 1000 * 15;


  return function() {

    var args = Array.prototype.slice.call(arguments, 0),
    killed   = false,
    oldNext,
    self = this;


    if(typeof args[args.length - 1] == "function") {
      oldNext = args.pop();
    } else {
      oldNext = function(err) {
        if(err) throw err;
      }
    }

    //start the race between the timed callback, and the kill timeout
    var killTimeout = setTimeout(function() {

      killed = true;

      //uh oh - timed callback took too long! time to throw an error
      oldNext.call(self, new comerr.Timeout());

    }, timeout);

    //call the timed callback
    timedCallback.apply(this, args.concat(function() {


      if(killed) return;

      //awesome - made it before the killTimeout could
      clearTimeout(killTimeout);

      //pass on the args
      oldNext.apply(this, arguments);
    }));
  }

  
}

