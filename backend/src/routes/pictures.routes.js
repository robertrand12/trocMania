const router = require("express").Router();

const pictureControllers = require("../controllers/pictureControllers");
const uploadContentsControllers = require("../controllers/uploadContentsControllers");

router.get("/", pictureControllers.browse);
router.get("/:id", pictureControllers.read);
router.post(
  "/",
  uploadContentsControllers.uploadContent,
  pictureControllers.add
);
router.delete("/:id", pictureControllers.destroy);

module.exports = router;
