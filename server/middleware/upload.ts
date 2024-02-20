const multer = require("multer");
const path = require("path");

// upload the floor plan image
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

exports.uploadFloorPlan = multer({
  storage: storage,
  fileFilter: function (req: any, file: any, callback: any) {
    if (file) {
      console.log("File uploaded");
    } else {
      console.log("No file uploaded");
    }
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/heic" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG" ||
      file.mimetype == "image/HEIC"
    ) {
      callback(null, true);
    } else {
      console.log("File formats should be jpg, jpeg, png, heic");
      callback(null, false);
    }
  },
});