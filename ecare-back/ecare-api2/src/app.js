import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js"
import medicamentosRoutes from "./routes/medicamentos.routes.js"
import serviciosRoutes from "./routes/servicios.routes.js"
import citasRoutes from "./routes/citas.routes.js"
// import morgan from "morgan";

import config from "./config.js";

const app = express();

// settings
app.set("port", config.port);

// Middlewares
app.use(cors());
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/usuarios", usuarioRoutes);
app.use("/medicamentos",medicamentosRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/citas", citasRoutes);

export default app;
