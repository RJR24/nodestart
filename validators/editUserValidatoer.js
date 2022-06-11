const validator = require("./validator");
const { check } = require("express-validator");

module.exports = new (class editUserValidator extends validator {
  handle() {
    return [check("name", "name fild can not be empty!").not().isEmpty()];
  }
})();
