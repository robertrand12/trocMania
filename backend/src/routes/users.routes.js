const router = require("express").Router();

const userControllers = require("../controllers/userControllers");
const passwordControllers = require("../controllers/passwordControllers");
const authControllers = require("../controllers/authControllers");

router.get("/", userControllers.browse);
router.get("/:id", userControllers.read);
router.get("/:id/logout", userControllers.logout);
router.put("/:id", passwordControllers.hashPassword, userControllers.edit);
router.post("/", passwordControllers.hashPassword, userControllers.add);
router.post(
  "/login",
  userControllers.login,
  passwordControllers.verifyPassword,
  authControllers.createToken
);
router.delete("/:id", userControllers.destroy);

module.exports = router;
