const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const timeStamp = new Date().getTime();
    const originalName = file.originalname;
    cb(null, `${timeStamp}-${originalName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 3 * 1000 * 1000,
  },

});

module.exports = upload;
