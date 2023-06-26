import { Router } from "express";
import {
  ingresarServicio,
  obtenerServicios,
} from "../controllers/servicios.controller.js";

const router = Router();

//servicios
router.get("/obtenerServicios",obtenerServicios) ;
router.post("/ingresarServicio", ingresarServicio) 


export default router;
