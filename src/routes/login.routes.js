const router = require("express").Router();
const passport = require("passport");

const {
  signInForm,
  signUpForm,
  logout
} = require("../controllers/login.controller");

router.get("/signin", signInForm);

router.post(
  "/signin",
  passport.authenticate("signin", {
    successRedirect: "/",
    failureRedirect: "/signin",
    passReqToCallback: true
  })
);

router.get("/signup", signUpForm);

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    passReqToCallback: true
  })
);

router.get("/logout", logout);

module.exports = router;
