const router = require("express").Router();
const userRoutes = require("./userRoutes");
const homeRoutes = require("../homeRoutes");
const commentRoutes = require("../api/commentRoutes");

router.use("/", homeRoutes);
router.use("/users", userRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
