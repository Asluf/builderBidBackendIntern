// UserRoutes.ts
import { getUser } from "../controllers/UserController";
import express from 'express';

const router = express.Router();

router.get("/getUser", getUser);

export { router };