import { Router } from "express";
import { obtenerRecetas } from "../controllers/recetas.controller.js";

const router = Router();

//recetas
router.post("/obtenerRecetas", obtenerRecetas);

export default router;
