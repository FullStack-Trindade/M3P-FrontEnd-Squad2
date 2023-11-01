import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import MockPaciente from "../pages/CadastroPaciente/mockPaciente";
import {PacientePage} from "../pages/CadastroPaciente/PacientePage";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/cadastrarpaciente" element={<PacientePage />} />
        <Route path="/mockpaciente" element={<MockPaciente />} />
        <Route path="*" element={<NotFoundPage />}/>       
      </Routes>
    </Router>
  );
};
