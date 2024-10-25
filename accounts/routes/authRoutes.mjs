import { Router } from "express";
import AuthController from "../controllers/AuthController.mjs";
const router = Router();
router.get("/login", AuthController.login);
export default router;
