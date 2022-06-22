var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishRouter");
var promoRouter = require("./routes/promoRouter");
var leaderRouter = require("./routes/leaderRouter");

var mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://127.0.0.1:27017/conFusion";
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("Connected correctly to server");
  })
  .catch((err) => console.log("HeRE", err));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("mnm123123"));
app.use(
  session({
    name: "session-id",
    secret: "mnm123123",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

// Added new middleware for authentication.
// Added here because all the following access to endpoints, it has to pass through the auth middleware

function auth(req, res, next) {
  // console.log(req.signedCookies);
  console.log(req);

  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }

    // encoded as username:password, hence split by : to get username and password in an array at index 0 for username and index 1 for password
    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    console.log("AUTH: ", auth);

    var username = auth[0];
    var password = auth[1];

    if (username === "admin" && password === "password") {
      // res.cookie("user", "admin", { signed: true });
      req.session.user = "admin";
      next();
    } else {
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  } else {
    if (req.session.user === "admin") {
      next();
    } else {
      var err = new Error("You are not authenticated!");
      err.status = 401;
      return next(err);
    }
  }
}
app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
