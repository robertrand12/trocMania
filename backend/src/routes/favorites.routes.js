const router = require("express").Router();

const favoriteControllers = require("../controllers/favoriteControllers");

router.get("/:adId/users/:userId", favoriteControllers.exist);
router.get("/:id", favoriteControllers.read);

router.post("/", favoriteControllers.add);
router.delete("/:id", favoriteControllers.destroy);

module.exports = router;
