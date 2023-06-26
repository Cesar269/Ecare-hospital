
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../src/Pages/Inicio";
import DatosUsuario from "./Pages/Settings/DatosUsuario";
import Login from "./Pages/Login";
import Layout from "./Components/Layout";
import Unauthorized from "./Components/Unauthorized";
import RequireAuth from "./Components/RequireAuth";
import Missing from "./Components/Missing";
import CerrarSesion from "./Pages/Settings/CerrarSesion";
import AltasBajasInfo from "./Pages/Settings/AltasBajasInfo";
import MisRecetasPaciente from "./Pages/Settings/MisRecetasPaciente";
import CitasPaciente from "./Pages/BarraNav/CitasPaciente"
import AlmacenAdmin from "./Pages/BarraNav/AlmacenAdmin"
import CitasAdmin from "./Pages/BarraNav/CitasAdmin"
import CitasDoctor from "./Pages/BarraNav/CitasDoctor"
import ConsultoriosAdmin from "./Pages/BarraNav/ConsultoriosAdmin"
import PacientesAdmin from "./Pages/BarraNav/PacientesAdmin"
import PacientesDoctor from "./Pages/BarraNav/PacientesDoctor"
import RecetasDoctor from "./Pages/BarraNav/RecetasDoctor"
import ServiciosGeneral from "./Pages/BarraNav/ServiciosGeneral"

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
            <Route path="DatosUsuario" element={<DatosUsuario />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.doctor, ROLES.admin]} />}>
            <Route path="AltasBajasInfo" element={<AltasBajasInfo />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.paciente]} />}>
            <Route path="MisRecetas" element={<MisRecetasPaciente />} />
            <Route path="CitasPaciente" element={<CitasPaciente />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.paciente,ROLES.doctor]} />}>
            <Route path="ServiciosGeneral" element={<ServiciosGeneral />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.doctor]} />}>
            <Route path="CitasDoctor" element={<CitasDoctor />} />
            <Route path="RecetasDoctor" element={<RecetasDoctor />} />
            <Route path="PacientesDoctor" element={<PacientesDoctor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="CitasAdmin" element={<CitasAdmin />} />
            <Route path="ConsultoriosAdmin" element={<ConsultoriosAdmin />} />
            <Route path="AlmacenAdmin" element={<AlmacenAdmin />} />
            <Route path="PacientesAdmin" element={<PacientesAdmin />} />

          </Route>


          {/* <Route exact path="HistorialClinico" element={<HistorialClinico />} />
          <Route exact path="Recetas" element={<Recetas />} />
          <Route exact path="NuevoUsuario" element={<NuevoUsuario />} />
          <Route exact path="Medicamentos" element={<Medicamentos />} />
          <Route exact path="NuevoServicio" element={<NuevoServicio />} />
          <Route exact path="DespliegueCitas" element={<DespliegueCitas />} />
          <Route exact path="DespliegueMedicamentos" element={<DespliegueMedicamentos />} /> */}

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