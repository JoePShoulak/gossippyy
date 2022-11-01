const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment, Follow } = require("../models");

router.get("/", withAuth, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: [{ model: User, through: Follow, as: "following" }],
  });

  const postData = await Post.findAll({
    include: [{ model: Comment, include: [{ model: User }] }, { model: User }],
  });

  const folowing_IDs = user.dataValues.following.map((u) => u.id);
  folowing_IDs.push(user.dataValues.id);

  const posts = postData
    .map((data) => data.get({ plain: true }))
    .filter((p) => folowing_IDs.includes(p.user_id))
    .reverse();

  res.render("homepage", { posts, loggedIn: req.session.logged_in });
});

router.get("/users/:id", async (req, res) => {
  const resp = await User.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        include: [{ model: Comment, include: [{ model: User }] }],
      },
    ],
  });

  const thisUser = await User.findByPk(req.session.user_id, {
    include: [{ model: User, through: Follow, as: "following" }],
  });
  const folowing_IDs = thisUser.dataValues.following.map((u) => u.id);
  folowing_IDs.push(thisUser.id);

  const user = resp.get({ plain: true });

  const notFollowed = !folowing_IDs.includes(user.id);

  if (req.session.logged_in) {
    res.render("profile", {
      user,
      notFollowed,
      loggedIn: req.session.logged_in,
    });
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

router.get("/friends", async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: [{ model: User, through: Follow, as: "following" }],
  });

  const friends = user.dataValues.following.map((data) =>
    data.get({ plain: true })
  );

  const folowing_IDs = user.dataValues.following.map((u) => u.id);

  const suggestionsData = await User.findAll();
  const suggestions = suggestionsData
    .map((data) => data.get({ plain: true }))
    .filter((user) => {
      return !folowing_IDs.includes(user.id) && user.id != req.session.user_id;
    });

  res.render("friends", { friends, suggestions });
});

module.exports = router;
