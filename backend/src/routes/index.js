const router = require("express").Router();
const userRouter = require("./users.routes");
const adRouter = require("./ads.routes");
const pictureRouter = require("./pictures.routes");
const favoriteRouter = require("./favorites.routes");
const messageRouter = require("./messages.routes");
const authControllers = require("../controllers/authControllers");

router.get(
  "/refresh-token",
  authControllers.verifyToken,
  authControllers.refreshToken,
  authControllers.createToken
);
router.use("/users", userRouter);
router.use("/ads", adRouter);
router.use("/pictures", pictureRouter);
router.use("/favorites", favoriteRouter);
router.use("/messages", messageRouter);

module.exports = router;
