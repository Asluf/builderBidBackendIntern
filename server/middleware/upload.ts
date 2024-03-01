import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { floorValidationSchema } from "../models/FloorplanModel";

// Validation function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateFloorPlanData = (floorPlanData: any) => {
  const validationResult = floorValidationSchema.validate(floorPlanData, {
    abortEarly: false,
  });

  return validationResult.error
    ? validationResult.error.details.map((detail) => detail.message)
    : null;
};

// Upload the floor plan image
export const uploadFloorPlan = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { floorplan_name, type, scale, notes } = req.body;
      const floorPlanData = { floorplan_name, type, scale, notes };

      const validationErrors = validateFloorPlanData(floorPlanData);
      if (validationErrors) {
        return res.status(400).json({ error: validationErrors.join(", ") });
      }

      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/heic",
    "application/octet-stream",
  ];

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("File formats should be jpg, jpeg, png, or heic"));
    }
  };

  const upload = multer({ storage, fileFilter }).single("image");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    next();
  });
};
