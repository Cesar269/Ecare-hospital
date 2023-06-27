import { Router } from "express";
import {
  ingresarServicio,
  ingresarServicioUsuario,
  obtenerServicios,
} from "../controllers/servicios.controller.js";

const router = Router();

//servicios
router.get("/obtenerServicios",obtenerServicios) ;
router.post("/ingresarServicio", ingresarServicio) 

router.post("/ingresarServicioUsuario", ingresarServicioUsuario) 


export default router;
