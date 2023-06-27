import { Router } from "express";
import {
  desplegarCitas, desplegarHistorialCitas, desplegarHistorialCitasDoctor,
} from "../controllers/citas.controller.js";

const router = Router();


//citas
router.post("/desplegarCitas", desplegarCitas);

router.post("/desplegarHistorialCitas", desplegarHistorialCitas);
router.post("/desplegarHistorialCitasDoctor", desplegarHistorialCitasDoctor);

export default router;
