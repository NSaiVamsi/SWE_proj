const multer = require("multer")

const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log("Hi in storage destination")
      const uploadPath = path.join(__dirname, '../public/uploads');
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // console.log("Hi in storage file_name")
      // console.log(file.originalname)
      cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)){
      // console.log("Hi in FileFilter if")
      cb(null, true);
    } else {
      // console.log("Hi in FileFilter else")
      cb(null, false);
    }
  };
  
  const uploadMiddleware = multer({ storage, fileFilter });
  
  module.exports = uploadMiddleware;