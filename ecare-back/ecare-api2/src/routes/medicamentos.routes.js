import { Router } from "express";
import {
  actualizarExistencia,
  desplegarConsultorios,
  desplegarMedicamentos,
  eliminarConsultorio,
  ingresarMedicamento,
  obtenerMedicamentos,
  obtenerPreciosMedicamentos,
} from "../controllers/medicamentos.controller.js";

const router = Router();


//medicamentos
router.get("/obtenerMedicamentos",obtenerMedicamentos) ;
router.post("/actualizarExistencia", actualizarExistencia) ;
router.post("/ingresarMedicamento", ingresarMedicamento);
router.post("/desplegarMedicamentos", desplegarMedicamentos);


router.post("/desplegarConsultorios", desplegarConsultorios);
router.post("/eliminarConsultorio", eliminarConsultorio);
router.post("/obtenerPreciosMedicamentos", obtenerPreciosMedicamentos);






export default router;
