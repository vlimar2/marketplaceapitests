

before('Bootstrap', function() {
  // If we're running in Node, then we need to expose our dependencies as globals.
  // When running in a browser, these dependencies are already globals.
  if (typeof window === 'undefined') {
    global.chai = require('chai');
    global.chaiHttp = require('chai-http');
  }

  chai.use(chaiHttp);
  expect = chai.expect;
});