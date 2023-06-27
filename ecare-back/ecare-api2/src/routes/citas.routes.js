import { Router } from "express";
import {
  desplegarCitas,
  programarCita
} from "../controllers/citas.controller.js";

const router = Router();


//citas
router.post("/desplegarCitas", desplegarCitas);
router.post("/programarCita", programarCita)


export default router;
