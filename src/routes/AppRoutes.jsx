import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import CadMedicamento from "../pages/CadMedicamento/CadMedicamento.page";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/cadMedicamento" element={<CadMedicamento />}/>
        <Route path="*" element={<NotFoundPage />}/>       
      </Routes>
    </Router>
  );
};
