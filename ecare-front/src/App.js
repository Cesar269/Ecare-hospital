
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../src/Pages/Inicio";
import DatosUsuario from "./Pages/DatosUsuario";
import Header from "./Components/Header";


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/DatosUsuario" element={<DatosUsuario />} />
        <Route exact path="/HistorialClinico" element={<DatosUsuario />} />
        <Route exact path="/Recetas" element={<DatosUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;