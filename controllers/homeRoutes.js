const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll();

  const posts = postData.map((data) => data.get({ plain: true }));

  console.log(req.session.logged_in);

  res.render("homepage", { posts, loggedIn: req.session.logged_in });
});

router.get("/profile", async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
  const user = userData.dataValues;

  if (req.session.logged_in) {
    // res.render("profile", { user });
    res.send("profile"); //TODO: clear this and render
  } else {
    res.redirect("/");
    return;
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.send("signup"); //TODO: clear this out
  // res.render("signup");
});

module.exports = router;
