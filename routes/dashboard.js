const express = require("express");
const router = express.Router();

///controllers
const dashboardController = require("controllers/dashboardController");
const editUserValidatoer = require("validators/editUserValidatoer");
const uploadUserProfile = require("upload/uploadUserProfile");

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
});

router.get("/", dashboardController.index);
router.post(
  "/edituser",
  uploadUserProfile.single("img"),
  (req, res, next) => {
    if (!req.file) {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  editUserValidatoer.handle(),
  dashboardController.edituser
);

module.exports = router;
