import { getUser, savePlan} from "../controller/planController";
import express from "express";

const router = express.Router();

router.get("/user", getUser);
router.post("/plan", savePlan);

export default router;