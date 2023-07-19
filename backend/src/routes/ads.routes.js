const router = require("express").Router();

const adControllers = require("../controllers/adControllers");

router.get("/", adControllers.browse);
router.get("/:id", adControllers.read);
router.put("/:id", adControllers.edit);
router.post("/", adControllers.add);
router.delete("/:id", adControllers.destroy);

module.exports = router;
