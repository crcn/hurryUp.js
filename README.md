hurryUp.js
==========

timeout library for callbacks


## API

### hurryUp(timedCallback, next, timeout=10000, ...args)

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
