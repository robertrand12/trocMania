const router = require("express").Router();

const adControllers = require("../controllers/adControllers");
const emailControllers = require("../controllers/emailControllers");

router.get("/", adControllers.browse);
router.get("/toVerified", adControllers.browseNotVerified);
router.get("/categories/:category", adControllers.browseByCategory);
router.get("/:id/users/:id", adControllers.browseByUserId);
router.get("/:id", adControllers.read);
router.put("/:id", adControllers.edit);
router.post("/", adControllers.add, emailControllers.verifyAdEmail);
router.put("/:id/valid", adControllers.valid, emailControllers.verifiedAdEmail);
router.delete(
  "/:id/invalid",
  adControllers.invalid,
  emailControllers.notVerifiedAdEmail
);
router.delete("/:id", adControllers.destroy);

module.exports = router;
