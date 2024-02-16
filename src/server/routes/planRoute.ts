import { getUser, savePlan} from "../controller/planController";
import express from "express";
import upload from "../../util/multerConfig";

const router = express.Router();

router.get("/user", getUser);
router.post("/plan", upload.single('planImage'), savePlan);

export default router;