import express from "express";
import TaskController from "../controllers/TaskController.mjs";
const router = express.Router();
router.get("/", TaskController.showTasks);
router.get("/add", TaskController.createTask);
router.post("/add", TaskController.createTaskPost);
router.post("/remove", TaskController.removeTasks);
router.get("/edit/:id", TaskController.updateTask);
export default router;
