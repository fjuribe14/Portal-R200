const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const v4 = require("uuid/v4");
const { getConnection } = require("../db/db");

// Methods
const encryptPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = async (id, password) => {
  const compare = await getConnection()
    .get("users")
    .find({ id: id })
    .value();
  return bcrypt.compareSync(password, compare);
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getConnection()
    .get("users")
    .find({ id: id })
    .value();
  done(null, user);
});

//
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const compare = await getConnection()
        .get("users")
        .find({ username: username })
        .value();
      if (compare) {
        return done(
          null,
          false,
          req.flash("error_msg", "El usuario ya existe")
        );
      } else {
        const user = {
          id: v4(),
          date: Date.now(),
          username: username,
          password: encryptPassword(password),
          privileges: false
        };
        await getConnection()
          .get("users")
          .push(user)
          .write();
        done(null, user);
      }
    }
  )
);

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const user = await getConnection()
        .get("users")
        .find({ username: username })
        .value();
      if (!user) {
        return done(
          null,
          false,
          req.flash("error_msg", "El usuario no existe")
        );
      } else {
        if (!comparePassword(user.id, user.password)) {
          return done(
            null,
            false,
            req.flash("error_msg", "Contraseña incorrecta")
          );
        } else {
          done(null, user);
        }
      }
    }
  )
);

const auth = {};

auth.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};

module.exports = auth;
