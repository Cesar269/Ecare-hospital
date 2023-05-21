
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../src/Pages/Inicio";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;