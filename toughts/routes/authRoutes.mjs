import { Router } from "express";
import AuthController from "../controllers/authController.mjs";
const router = Router();
router.get("/login", AuthController.login);
router.post("/login", AuthController.loginPost);
router.get("/register", AuthController.register);
router.post("/register", AuthController.registerPost);
router.get("/logout", AuthController.logout);
export default router;
