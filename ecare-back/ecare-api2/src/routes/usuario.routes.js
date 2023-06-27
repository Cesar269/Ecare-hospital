import { Router } from "express";
import {
  actualizarUsuario,
  desplegarUsuarios,
  handleLogin,
  login,
  obtenerCaracteristicas,
  obtenerUsuario,
  obtenerUsuarios,
  registrarUsuario
} from "../controllers/usuarios.controller.js";

const router = Router();

//usuarios
router.get("/", obtenerUsuarios);
router.post("/obtenerUsuarioCurp", obtenerUsuario);
router.post("/actualizarUsuario", actualizarUsuario);

router.get("/obtenerCaracteristicas", obtenerCaracteristicas);
router.post("/registrarUsuario", registrarUsuario);

router.post("/desplegarUsuarios", desplegarUsuarios);

router.post('/login',handleLogin);


export default router;
