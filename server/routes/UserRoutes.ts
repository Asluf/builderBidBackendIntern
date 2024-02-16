// UserRoutes.ts
import { getUser, saveFloorPlan } from "../controllers/UserController";
import express from 'express';
const upload = require('../middleware/upload.ts');

const router = express.Router();

router.get("/getUser", getUser);
router.post("/saveFloorPlan",upload.uploadFloorPlan.single('image'), saveFloorPlan);

export { router };