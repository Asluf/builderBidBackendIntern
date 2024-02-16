import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);
    callback(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

export default upload;
