const router = require("express").Router();
const itemsRouter = require("./items.routes");

router.use("/items", itemsRouter);

module.exports = router;
