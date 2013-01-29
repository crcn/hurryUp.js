
require("../")(function(a, next) {
  setTimeout(next, 500, null, a);
}, 500).call(null, "f", function() {
  console.log(arguments)
})