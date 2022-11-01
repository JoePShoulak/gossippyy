const router = require("express").Router();
const { User } = require("../../models");
const Follow = require("../../models/Follow");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/follow/:id", async (req, res) => {
  console.log("User Route fired");
  try {
    const user = req.session.user_id;
    const target_user = req.params.id;

    const resp = await Follow.create({
      follower_id: user,
      following_id: target_user,
    });

    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const nums = [1, 2, 3, 4, 5];
    const randomImage = `/images/random${
      nums[Math.floor(Math.random() * 3)]
    }.jpg`;

    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      image: randomImage,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
