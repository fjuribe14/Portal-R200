const { getConnection } = require("../db/db");
const { v4 } = require("uuid");

const loginCtrl = {};

loginCtrl.signInForm = (req, res) => {
  res.render("users/signin");
};

loginCtrl.signUpForm = (req, res) => {
  res.render("users/signup");
};

loginCtrl.logout = (req, res) => {
  req.logout();
  res.redirect("/signin");
};

module.exports = loginCtrl;
