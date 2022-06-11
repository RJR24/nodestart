const validator = require('./validator');
const { check} = require("express-validator");

module.exports = new class userValidator extends validator{
    handle (){
      return  [
        check("email", "This Is Not A Valid Email Type!").isEmail(),
        check("password", "Password Should Be 8 characters At Least!").isLength({
          min: 8,
        }),
      ]
    }
}


