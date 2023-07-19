const router = require("express").Router();

const messageControllers = require("../controllers/messageControllers");

router.get("/", messageControllers.browse);
router.get("/:id", messageControllers.read);
router.post("/", messageControllers.add);

module.exports = router;
