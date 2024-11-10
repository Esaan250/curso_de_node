import { Router } from "express";
const router = Router();
import ProductsController from "../controllers/ProductsController.mjs";
router.get("/create", ProductsController.createProduct);
router.post("/create", ProductsController.createProductPost);
router.post("/remove/:id", ProductsController.removeProduct);
router.get("/", ProductsController.showProducts);
router.get("/edit/:id", ProductsController.editProductPage);
router.post("/edit/", ProductsController.editProductPost);
router.get("/:id", ProductsController.getProduct);
export default router;
