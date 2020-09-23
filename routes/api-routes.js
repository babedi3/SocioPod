// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const bodyParser = require("body-parser");
const axios = require("axios");

module.exports = function (app) {
  // parse application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // parse application/json
  app.use(bodyParser.json());
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/members",
      failureRedirect: "/login"
    })
  );
  app.post("/api/signup", (req, res) => {
    console.log("hello");
    console.log(req.body);
    console.log(db.User);
    console.log(req.body.firstName);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      intOne: req.body.intOne,
      intTwo: req.body.intTwo,
      intThree: req.body.intThree
    })
      .then(() => {
        res.redirect(307, "/members/:intOne/:intTwo/:intThree");
        //  console.log("from then", user.email);
        //    console.log(user.password);
      })
      .catch(err => {
        res.status(401).json(err);
        console.log(err);
        //console.log("from error", user.email);
        //console.log(user.password);
      });
  });
  app.get("/members/:intOne/:intTwo/:intThree", (req, res) => {
    console.log(req.params);
    res.render("home");
  });
  // Route to call api
  app.post("/profile", (req, res) => {
    console.log(req);
    console.log("----------------------------");
    console.log("----------------------------");
    console.log("----------------------------");
    console.log("----------------------------");
    console.log("----------------------------");
    console.log(res);
  });
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
