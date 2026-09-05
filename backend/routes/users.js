const router = require("express").Router();
const controller = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/me", auth, controller.me);
router.get("/leaderboard", controller.leaderboard);

module.exports = router;
