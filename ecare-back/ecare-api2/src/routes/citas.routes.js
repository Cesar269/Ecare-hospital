import { Router } from "express";
import {
  desplegarCitas,
} from "../controllers/citas.controller.js";

const router = Router();


//citas
router.post("/desplegarCitas", desplegarCitas);


export default router;
