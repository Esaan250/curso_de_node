import { Router } from "express";
import ToughtsController from "../controllers/ToughtsController.mjs";
const router = Router();
router.get("/", ToughtsController.showToughts);
export default router;
