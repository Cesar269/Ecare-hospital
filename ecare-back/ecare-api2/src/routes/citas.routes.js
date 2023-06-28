import { Router } from "express";
import {
  actualizarCita,
  cancelarCita,
  desplegarCitas, desplegarHistorialCitas, desplegarHistorialCitasDoctor,desplegarHistorialCitasPorDoctor,obtenerCitasDoctor,programarCita, registrarCita
} from "../controllers/citas.controller.js";

const router = Router();


//citas
router.post("/desplegarCitas", desplegarCitas);
router.post("/programarCita", programarCita)

router.post("/desplegarHistorialCitas", desplegarHistorialCitas);
router.post("/desplegarHistorialCitasDoctor", desplegarHistorialCitasDoctor);
router.post("/obtenerCitasDoctor", obtenerCitasDoctor)

router.post("/registrarCita", registrarCita)
router.post("/actualizarCita", actualizarCita)

router.post("/cancelarCita", cancelarCita)


router.post("/obtenerCitasDoctor", obtenerCitasDoctor)
router.post("/desplegarHistorialCitasPorDoctor", desplegarHistorialCitasPorDoctor)



export default router;
