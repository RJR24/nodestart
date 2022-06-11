const express = require("express");
const router = express.Router();

///controllers
const userController = require("controllers/userController");

///validators
const userValidator = require("validators/userValidator");

router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.seeOneUser.bind(userController));
router.post("/",userValidator.handle(),userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

module.exports = router;
