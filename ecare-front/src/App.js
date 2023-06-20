
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
import Login from "./Pages/Login";
import Layout from "./Components/Layout";
import Unauthorized from "./Components/Unauthorized";
import RequireAuth from "./Components/RequireAuth";
import Missing from "./Components/Missing";
import CerrarSesion from "./Pages/CerrarSesion";

const ROLES = {
  'paciente': '1',
  'doctor': '2',
  'admin': '3'
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="unauthorized" element={<Unauthorized></Unauthorized>} />
          <Route exact path="CerrarSesion" element={<CerrarSesion />} />


          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.paciente, ROLES.doctor, ROLES.admin]} />}>
            <Route path="/home" element={<Inicio />} />
          </Route>


          <Route exact path="DatosUsuario" element={<DatosUsuario />} />
          <Route exact path="HistorialClinico" element={<HistorialClinico />} />
          <Route exact path="Recetas" element={<Recetas />} />
          <Route exact path="NuevoUsuario" element={<NuevoUsuario />} />
          <Route exact path="Medicamentos" element={<Medicamentos />} />
          <Route exact path="NuevoServicio" element={<NuevoServicio />} />
          <Route exact path="DespliegueCitas" element={<DespliegueCitas />} />
          <Route exact path="DespliegueMedicamentos" element={<DespliegueMedicamentos />} />
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route> */}

          {/* catch all */}
          <Route path="*" element={<Missing></Missing>} />
        </Route>
      </Routes>
      {/* <Header></Header>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/DatosUsuario" element={<DatosUsuario />} />
        <Route exact path="/HistorialClinico" element={<HistorialClinico />} />
        <Route exact path="/Recetas" element={<Recetas />} />
        <Route exact path="/NuevoUsuario" element={<NuevoUsuario />} />
        <Route exact path="/Medicamentos" element={<Medicamentos />} />
        <Route exact path="/NuevoServicio" element={<NuevoServicio />} />
        <Route exact path="/DespliegueCitas" element={<DespliegueCitas />} />
        <Route exact path="/DespliegueMedicamentos" element={<DespliegueMedicamentos />} />
      </Routes> */}
    </>
  );
}

export default App;