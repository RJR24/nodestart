const validator = require("./validator");
const { check } = require("express-validator");

module.exports = new (class userValidator extends validator {
  register() {
    return [
      check("name", "This field could not be empty!").not().isEmpty(),
      check("email", "This Is Not A Valid Email Type!").isEmail(),
      check("password", "Password Should Be 8 characters At Least!").isLength({
        min: 8,
      }),
    ];
  }
  login() {
    return [
      check("email", "This Is Not A Valid Email Type!").isEmail(),
      check("password", "Password Should Be 8 characters At Least!").isLength({
        min: 8,
      }),
    ];
  }
})();
