// UserRoutes.ts
import { getUser, saveFloorPlan, getFloorPlan } from "../controllers/UserController";
import express from 'express';
// const upload = require('../middleware/upload.ts');
// import uploadFloorplan from "../middleware/upload"
import { uploadFloorPlan } from "../middleware/upload";

const router = express.Router();

router.get("/getUser", getUser);
router.post("/saveFloorPlan",uploadFloorPlan.single('image'), saveFloorPlan);
router.get("/get_all_floor_plan", getFloorPlan)

export { router };