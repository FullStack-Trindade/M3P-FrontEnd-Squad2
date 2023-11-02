import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import { LoginPage } from "../pages/LoginPage/Login.page";
import { PrivateRoutes } from "./PrivateRoutes";
import { HomePage } from "../pages/Home/Home.page";
import {PacientePage} from "../pages/CadastroPaciente/PacientePage";
/* import { useAuth } from "../hooks/useAuth"; */


export const AppRoutes = () => {
  /* const { usuario } = useAuth(); */
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />}/>       
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            {/* {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/config" element={<h1>Teste</h1>} />} */}
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cadastrapaciente" element={<PacientePage />}/>
        <Route path="/editapaciente/:id" element={<PacientePage />}/>
      </Routes>
    </Router>
  );
};
