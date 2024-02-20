// UserRoutes.ts
import { getUser, saveFloorPlan,getFloorPlan } from "../controllers/UserController";
import express from 'express';
const upload = require('../middleware/upload.ts');
import {errorHandler} from '../middleware/errorHandler';

const router = express.Router();

router.get("/get_user", getUser);
router.post("/save_floor_plan", upload.uploadFloorPlan.single('image'), saveFloorPlan, errorHandler );
router.get("/get_floor_plan/:plan_id", getFloorPlan);
export { router };