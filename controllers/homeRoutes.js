const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: Comment, include: [{ model: User }] }, { model: User }],
  });

  const posts = postData.map((data) => data.get({ plain: true })).reverse();

  console.log(req.session.logged_in);

  res.render("homepage", { posts, loggedIn: req.session.logged_in });
});

router.get("/users/:id", async (req, res) => {
  console.log(req.params);

  const resp = await User.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        include: [{ model: Comment, include: [{ model: User }] }],
      },
    ],
  });

  const user = resp.get({ plain: true });
  console.log(user);

  if (req.session.logged_in) {
    res.render("profile", { user, loggedIn: req.session.logged_in });
  } else {
    console.log("not logged in");
    res.redirect("/");
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
    res.render("search", { users, loggedIn: req.session.logged_in });
  } else {
    res.redirect("/");
    return;
  }
});

router.get("/profile", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect(`/users/${req.session.user_id}`);
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

  res.render("login", { nobar: true });
});

router.get("/signup", (req, res) => {
  res.render("signup", { nobar: true });
});

module.exports = router;
