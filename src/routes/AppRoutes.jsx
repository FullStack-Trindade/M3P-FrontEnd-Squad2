import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import {PacientePage} from "../pages/CadastroPaciente/PacientePage";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/cadastrapaciente" element={<PacientePage />}/>
        <Route path="/editapaciente/:id" element={<PacientePage />}/>
        <Route path="*" element={<NotFoundPage />}/>       
      </Routes>
    </Router>
  );
};
