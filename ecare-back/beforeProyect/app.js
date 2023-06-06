import express from "express";
import cors from "cors";
import usuarioRouter from "./routes/usuarioRouter"
// import morgan from "morgan";


const app = express();

// settings
app.set("port", 3001);

// Middlewares
app.use(cors());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", usuarioRouter);

export default app;