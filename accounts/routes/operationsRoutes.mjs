import { Router } from "express";
import checkAuth from "../helpers/auth.mjs";
import OperationsController from "../controllers/bankOperationsController.mjs";
const router = Router();
router.get("/home", checkAuth, OperationsController.operationsPage);
export default router;
