var express = require("express");
const bodyParser = require("body-parser");
const Users = require("../models/users");
var passport = require("passport");
var authenticate = require("../authenticate");

var userRouter = express.Router();
userRouter.use(bodyParser.json());
/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

userRouter.post("/signup", function (req, res, next) {
  // register is a passport method
  Users.register(
    new Users({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    status: "You are successful logged in!",
    token: token,
  });
});

userRouter.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = userRouter;
