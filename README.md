hurryUp.js
==========

timeout library for callbacks


## API

### hurryUp(timedCallback, next, timeout=10000, ...args)

```javascript
hurryUp(function(next) {
  
  //this will cause an error
  setTimeout(next, 2000);
}, function(err, result) {
  console.error("timeout has occurred!")
}, 1000);
```
