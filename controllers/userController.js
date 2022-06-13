let controller = require("./controller");
const User = require("../models/user");

const { validationResult } = require("express-validator");

class UserController extends controller {
  async getAllUsers(req, res, next) {
    try {
      let users = await User.find({});
      res.render("users", {
        users: users,
        title: "All Users",
        errors: req.flash("errors"),
        message: req.flash("message"),
      });
    } catch (err) {
      next(err);
    }
  }

  async seeOneUser(req, res, next) {
    try {
      let user = await User.findById(req.params.id);
      if (!user){
        this.error(404 , "User Does Not Exist!");
      }
      res.render("user", { user: user });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      await User.updateMany({ _id: req.params.id }, { $set: req.body });
      req.flash("message", "User Updated Successfully!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let myErrors = errors.array().map((err) => err.msg);
        req.flash("errors", myErrors);
        return res.redirect("/dashboard");
      }
      req.body.id = parseInt(req.body.id);
      let newUser = new User({
        email : req.body.email,
        first_name : req.body.first_name,
        password : req.body.password,
      });
      await newUser.save();
      req.flash("message", "User Created Successfully!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await User.deleteOne({ _id: req.params.id });
      req.flash("message", "User Removed Successfully!");
      return res.redirect("/user");
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserController();
