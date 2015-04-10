[![Build Status](https://travis-ci.org/crcn/hurryUp.js.svg)](https://travis-ci.org/crcn/hurryUp.js)

HurryUp is a timeout library for asynchronous, fault-prone function calls. Basically, it'll timeout an async call if it's been running for too long. You can also specify to re-call async functions until they succeed (see below).

What can you use it for?

- db operations
- api calls
- async jobs


#### hurryUp(asyncCallback, optionsOrTimeout, ...args)

- `asyncCallback` - async function to call
- `optionsOrTimeout` 
  - `object` - options passed
    - `retry` - TRUE if the timedCallback should be re-called if it returns an error
    - `retryTimeout` - timeout between retrying timed callback
    - `timeout` - kill timeout
  - `number` - the timeout before killing the function call
- `...args` - additional arguments to pass to the async callback

```javascript
hurryUp(function(next) {
  
  //this will cause an error
  setTimeout(next, 2000);
}, 1000).call(null, function(err, result) {
  console.error("timeout has occurred!")
})
```

Here's an easier way to wrap around a method:

```javascript
hurryUp(emitter.once, 1000).call(emitter, "connected", function(err, result) {
  
});
```

You can also use hurryup to run a callback multiple times until it succeeds, like so:

```javascript

function isItReady(next) {
  //async stuff here
  next(new Error("no!"));
}

hurryUp(function(next) {
  isItReady(next);
}, { retry: true }).call(null, function(err) {
  console.log(err.message); //no!
});
```
