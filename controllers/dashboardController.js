let controller = require("./controller");
const User = require("./../models/user");

const { validationResult } = require("express-validator");

module.exports = new class dashboardController extends controller {
  async index(req, res, next) {
    try {
      res.render('dashboard/index')
    } catch (err) {
      next(err);
    }
  }

  async edituser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }
      console.log(req.body);
    } catch (err) {
      next(err);
    }
  }
}
