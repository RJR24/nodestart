const express = require("express");
// const { send } = require('express/lib/response');
const app = express();
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
require("app-module-path").addPath(__dirname);
require("dotenv").config();
const passport = require("passport");
const res = require("express/lib/response");
const MongoStore = require("connect-mongo");
const { initialize } = require("passport/lib");
//var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/nodestart")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log("could not connect to the database!"));

global.config = require("./config");

//////////////Views/////////////////
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("method"));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
    // store : new MongoStore({mongooseConnection : mongoose.connection })
    // store: MongoStore.create({
    //     mongoUrl: 'mongodb://localhost/test-app',
    //     ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    //   })
  })
);

app.use(flash());

require("./passport/passport-local");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals = { errors: req.flash("errors"), req };
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", require("./routes/index"));

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
