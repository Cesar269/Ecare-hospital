
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../src/Pages/Inicio";
import DatosUsuario from "./Pages/DatosUsuario";
import HistorialClinico from "./Pages/HistorialClinico";
import Recetas from "./Pages/Recetas";
import NuevoUsuario from "./Pages/NuevoUsuario";
import Header from "./Components/Header";
import Medicamentos from "./Pages/Medicamentos";
import NuevoServicio from "./Pages/NuevoServicio";
import DespliegueCitas from "./Pages/DespliegueCitas";
import DespliegueMedicamentos from "./Pages/DespliegueMedicamentos";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/DatosUsuario" element={<DatosUsuario />} />
        <Route exact path="/HistorialClinico" element={<HistorialClinico />} />
        <Route exact path="/Recetas" element={<Recetas />} />
        <Route exact path="/NuevoUsuario" element={<NuevoUsuario />} />
        <Route exact path="/Medicamentos" element={<Medicamentos />} />
        <Route exact path="/NuevoServicio" element={<NuevoServicio />} />
        <Route exact path="/DespliegueCitas" element={<DespliegueCitas />} />
        <Route exact path="/DespliegueMedicamentos" element={<DespliegueMedicamentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;