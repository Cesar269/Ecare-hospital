import { Router } from "express";
import { obtenerUsuarios} from "../controllers/usuarios.controller";

const router = Router();

router.get("/usuario", getProducts);


export default router;