import { Router } from "express";
import {
  actualizarExistencia,
  desplegarMedicamentos,
  ingresarMedicamento,
  obtenerMedicamentos,
} from "../controllers/medicamentos.controller.js";

const router = Router();


//medicamentos
router.get("/obtenerMedicamentos",obtenerMedicamentos) ;
router.post("/actualizarExistencia", actualizarExistencia) ;
router.post("/ingresarMedicamento", ingresarMedicamento);
router.post("/desplegarMedicamentos", desplegarMedicamentos);




export default router;
