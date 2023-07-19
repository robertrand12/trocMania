const router = require("express").Router();

const pictureControllers = require("../controllers/pictureControllers");

router.get("/", pictureControllers.browse);
router.get("/:id", pictureControllers.read);
router.post("/", pictureControllers.add);
router.delete("/:id", pictureControllers.destroy);

module.exports = router;
