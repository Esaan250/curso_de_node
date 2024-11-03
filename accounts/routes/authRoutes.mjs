import { Router } from "express";
import AuthController from "../controllers/authController.mjs";
const router = Router();
router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.loginPost);
router.get("/register", AuthController.registerPage);
router.post("/register", AuthController.registerPost);
router.get("/logout", AuthController.logout);
export default router;
