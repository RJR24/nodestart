const express = require("express");
const router = express.Router();

///controllers
const dashboardController = require("controllers/dashboardController");
const editUserValidatoer = require("validators/editUserValidatoer");

router.use((req,res,next)=>{
  if(req.isAuthenticated()){
    return next();
  } 
  res.redirect('/');
})

router.get("/", dashboardController.index);
router.post("/edituser", dashboardController.edituser);


module.exports = router;
