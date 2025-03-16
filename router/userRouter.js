const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/user.js");

router.route("/signup")
  .get((req, res) => {
    res.render("../views/pages/signup.ejs");
  })
  .post((req, res) => {
    UserController.signUp(req, res); // Handle user signup
  });

router.route("/login")
  .get((req, res) => {
    res.render("../views/pages/login.ejs", { cssFile: "/css/style.css" });
  })
  .post(
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    UserController.login
  );

router.get('/logout', UserController.logOut);

router.route("/home")
  .get((req, res) => {
    res.render("../views/pages/home.ejs");
  });

router.route("/stock")
  .get((req, res) => {
    res.render("../views/pages/stock.ejs");
  });

// Profile route to view the user profile
router.route("/profile/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params; // Use req.params.id to get the user ID
      const user = await UserController.getUserById(id); // Get user data from the controller

      if (!user) {
        return res.status(404).send("User not found"); // Handle user not found
      }

      res.render("../views/pages/profile.ejs", { user }); // Pass the user object to the view
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
