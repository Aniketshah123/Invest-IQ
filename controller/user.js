const User = require("../model/userSchema.js");

module.exports.signUp = async (req, res) => {
    try {
      const { email, firstname, password } = req.body;
      // Validate input data
      if (!email || !password) {
        req.flash("failed", "Email and password are required.");
        return res.redirect("/signup");
    }
      console.log(req.body);
      console.log(password);
      const newUser = new User({ email, firstname });
      const registerUser = await User.register(newUser,password);
      req.login(registerUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to InvestIQ");
        console.log("Successfull");
        return res.redirect("/home");
      });
    } catch (err) {
      req.flash("failed", err.message);
    console.log(err);
      res.redirect("/signup");
    }
  }

  module.exports.login = async(req, res) => {
    req.flash("success","Welcome to InvestIQ");
    let redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);
  }

module.exports.logOut = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success","Logged Out Successfully");
      res.redirect('/login');
    });
  }

module.exports.getUserById = async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
}