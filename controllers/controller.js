// const autoBind = require('auto-bind');

// const { status } = require("express/lib/response");

class Controller {
  constroctur() {
    // autoBind(this);
  }
  error(message, status = 500) {
    let err = new Error(message);
    err.status = status;
    throw err;
  }
}

module.exports = Controller;
