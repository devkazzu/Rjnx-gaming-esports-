const router = require("express").Router();
const controller = require("../controllers/tournamentController");
const auth = require("../middleware/auth");

router.get("/", controller.getTournaments);
router.get("/results", controller.getResults);
router.post("/", auth, controller.createTournament);
router.post("/:id/register", auth, controller.register);

module.exports = router;
