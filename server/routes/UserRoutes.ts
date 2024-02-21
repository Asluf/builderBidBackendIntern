import { getUser, saveFloorPlan, getFloorPlan, getFloorPlanByType,updateFloorPlan, deleteFloorPlan} from "../controllers/planController";
import express from 'express';
import { uploadFloorPlan } from "../middleware/upload";
import multer from "multer";
// import multer from "multer";

const router = express.Router();

router.get("/getUser", getUser);
router.post("/save-floor-plan", uploadFloorPlan, saveFloorPlan);
router.get("/get-all-floor-plan", getFloorPlan);
router.get("/get-floor-plan/:type", getFloorPlanByType);
router.patch("/update-floor-plan/:id",multer().any(), updateFloorPlan);
router.delete("/delete-floor-plan/:id", deleteFloorPlan);



export { router };