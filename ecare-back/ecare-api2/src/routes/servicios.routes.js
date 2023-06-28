import { Router } from "express";
import {
  ingresarServicio,
  ingresarServicioUsuario,
  obtenerConsultorios,
  obtenerCupoConsultorios,
  obtenerServicios,
  obtenerPreciosServicios,
} from "../controllers/servicios.controller.js";

const router = Router();

//servicios
router.get("/obtenerServicios",obtenerServicios) ;
router.post("/ingresarServicio", ingresarServicio) 

router.post("/ingresarServicioUsuario", ingresarServicioUsuario) 

router.get("/obtenerConsultorios",obtenerConsultorios) ;

router.post("/obtenerCupoConsultorios", obtenerCupoConsultorios) 

router.post("/obtenerPreciosServicios", obtenerPreciosServicios) 


export default router;
