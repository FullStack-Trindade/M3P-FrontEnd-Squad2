import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import MockPaciente from "../pages/CadastroPaciente/mockPaciente";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/mockpaciente" element={<MockPaciente />} />
        <Route path="*" element={<NotFoundPage />}/>       
      </Routes>
    </Router>
  );
};
