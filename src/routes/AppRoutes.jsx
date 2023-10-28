import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import MockPaciente from "../pages/CadastroPaciente/mockPaciente";
import CadastroPaciente from "../pages/CadastroPaciente/CadastroPacientePage";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/cadastrarpaciente" element={<CadastroPaciente />} />
        <Route path="/mockpaciente" element={<MockPaciente />} />
        <Route path="*" element={<NotFoundPage />}/>       
      </Routes>
    </Router>
  );
};
