const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/images/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-content-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadContent = (req, res, next) => {
  upload.single("source")(req, res, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (!req.file) {
        req.body.source = null;
      } else {
        req.body.source = req.file.filename;
      }

      next();
    }
  });
};

module.exports = { uploadContent };
