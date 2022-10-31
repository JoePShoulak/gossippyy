const router = require("express").Router();
const userRoutes = require("./userRoutes");
const homeRoutes = require("../homeRoutes");
const commentRoutes = require("../api/commentRoutes");
const postRoutes = require("../api/postRoutes");

router.use("/", homeRoutes);
router.use("/users", userRoutes);
router.use("/comment", commentRoutes);
router.use("/post", postRoutes);

module.exports = router;
