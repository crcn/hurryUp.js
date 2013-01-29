var comerr = require("comerr"),
outcome = require("outcome");

module.exports = function(timedCallback, next, timeout) {

  var args = Array.prototype.slice.call(arguments, 0).slice(3),
  timeout  = timeout || 1000 * 15,
  killed   = false;


  //start the race between the timed callback, and the kill timeout
  var killTimeout = setTimeout(function() {

    killed = true;

    //uh oh - timed callback took too long! time to throw an error
    next(new comerr.Timeout());

  }, timeout);

  //call the timed callback
  timedCallback.apply(null, args.concat(function() {


    if(killed) return;

    //awesome - made it before the killTimeout could
    clearTimeout(killTimeout);

    //pass on the args
    next.apply(null, arguments);
  }));
}
