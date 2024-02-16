import multer from 'multer';
import path from 'path';
// upload the floor plan image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
export const uploadFloorPlan = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/heic" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG" ||
      file.mimetype == "image/HEIC" ||
      file.mimetype == "application/octet-stream"
    ) {
      callback(null, true);
    } else {
      console.log("File formats should be jpg, jpeg, png");
      callback(null, false);
    }
  },
});




