const validator = require("./validator");
const { check } = require("express-validator");
const path = require("path");

module.exports = new (class editUserValidator extends validator {
  handle() {
    return [
      check("name", "name field can not be empty!").not().isEmpty(),
      check("img", "profile picture is required!").not().isEmpty(),
      check("img").custom(async (value) => {
        if (!value) {
          return;
        }
        if (![".jpg", ".jpeg", ".png"].includes(path.extname(value))) {
          throw new Error("profile picture extention is not correct!");
        }
      }),
    ];
  }
})();
