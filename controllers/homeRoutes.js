const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll();

  const posts = postData.map((data) => data.get({ plain: true }));

  console.log(req.session.logged_in);

  res.render("homepage", { posts, loggedIn: req.session.logged_in });
});

router.get("/users/:id", async (req, res) => {
  const userData = await User.findByPk(req.params.id);
  const user = userData.dataValues;

  if (req.session.logged_in) {
    res.render("profile", { user });
  } else {
    res.redirect("/");
    return;
  }
});

router.get("/users/search/:name", async (req, res) => {
  const userData = await User.findAll({
    where: {
      first_name: req.params.name,
    },
  });
  const users = userData.map((data) => data.get({ plain: true }));

  if (req.session.logged_in) {
    res.render("search", { users });
  } else {
    res.redirect("/");
    return;
  }
});

router.get("/profile", async (req, res) => {
  if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.dataValues;

    res.render("profile", { user });
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
  res.render("signup");
});

module.exports = router;
