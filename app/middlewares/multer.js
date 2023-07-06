const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/uploads/`)
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 9999999) + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb({
      message: "Unsuported file format"
    }, false)
  }
}
const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter
})

module.exports = uploadMiddleware;
