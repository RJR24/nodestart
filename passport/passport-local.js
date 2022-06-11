const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.serializeUser((user,done)=>{
  done(null,user.id);
})

passport.deserializeUser( async (id,done)=>{
  let user = await User.findById(id);
  if(user) done(null,user)
})

passport.use('local.register' , new localStrategy(
  {
    usernameField : 'email' ,
    passwordField : 'password' ,
    passReqToCallback : true
  } , async (req,email,passport,done)=>{
      try {
        let user = await User.findOne({email : req.body.email});
      if(user){
        return done(null,false,req.flash('errors' , 'this user is allready registerd!'));
      }
      const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
      });
      await newUser.save();
      done(null,newUser);
      } catch (error) {
        return done(error , false , {message : error})
      } 
  }

))

passport.use('local.login' , new localStrategy(
  {
    usernameField : 'email' ,
    passwordField : 'password' ,
    passReqToCallback : true
  } , async (req,email,password,done)=>{
      try {
        let user = await User.findOne({email : req.body.email});
      if(!user || !bcrypt.compareSync(req.body.password, user.password)){
        return done( null , false , req.flash('errors' , 'Password or Username is incorrect!'));
      }
      done (null,user);
      } catch (error) {
        return done(error ,false, {message : error})
      }
  } ))



