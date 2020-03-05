const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const method = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ejsLayouts = require("express-ejs-layouts");

// Inititaion
// *** express
const app = express();
// *** passport
require("./helpers/passport");
// *** dotenv
dotenv.config();

// Settings
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayouts);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// *** method-override
app.use(method("_method"));
// *** express-session
app.use(
  session({
    secret: "mysecretkey",
    resave: true,
    saveUninitialized: true
  })
);
// *** passport
app.use(passport.initialize());
app.use(passport.session());
// *** connect-flash
app.use(flash());

// Gobal Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user || null;
  next();
});

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/payment/:id", express.static(path.join(__dirname, "public")));
app.use("/expenses/:id", express.static(path.join(__dirname, "public")));

// Routes
app.use(require("./routes/login.routes"));
app.use(require("./routes/r200.routes"));
app.use("*", (req, res, next) => {
  res.status(404).send("error 404");
  next();
});

module.exports = app;
