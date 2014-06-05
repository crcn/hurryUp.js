var hurryUp = require("../"),
expect = require("expect.js");

describe("hurryup", function() {

  it("can timeout a function", function(done) {
    hurryUp(function(){}, 1).call(null, function(err) {
      expect(err).not.to.be(undefined);
      done();
    });
  });


  it("can timeout a function with options", function(done) {
    hurryUp(function(){}, { timeout: 1 }).call(null, function(err) {
      expect(err).not.to.be(undefined);
      done();
    });
  })

  it("can successfuly call a function", function(done) {
    hurryUp(function(cb) {
      cb(null, "hello!");
    }, 1).call(null, function(err, message) {
      expect(message).to.be("hello!");
      done();
    });
  });

  it("can run multiple tries", function(done) {

    var count = 0;

    hurryUp(function(cb) {
      if(count > 10) {
        return cb();
      } else {
        count++;
        cb(new Error("not done yet!"));
      }
    }, {
      retry: true,
      retryTimeout: 1
    }).call(null, function(err) {
      expect(count).to.be(11);
      done();
    });
  });

  it("can dispose a hurryup call", function (done) {

    var count = 0;
    var c = hurryUp(function (cb) {
      setTimeout(function () {
        count++;
        cb(new Error("a"));
      }, 0);
    }, { retry: true, retryTimeout: 1 });

    setTimeout(function () {
      expect(count).to.be(1);
      done();
    }, 50);


    c().dispose();


  });

  it("can fail a retry function", function(done) {
    var count = 0;

    hurryUp(function(cb) {
      cb(new Error("not done yet!"));
    }, {
      retry: true,
      retryTimeout: 1,
      timeout: 50
    }).call(null, function(err) {
      expect(err).not.to.be(undefined);
      done();
    });
  })
});