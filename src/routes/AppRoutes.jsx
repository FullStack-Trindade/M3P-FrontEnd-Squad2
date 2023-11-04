import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import { LoginPage } from "../pages/LoginPage/Login.page";
import { PrivateRoutes } from "./PrivateRoutes";
import { HomePage } from "../pages/Home/Home.page";
import { ExamePage } from "../pages/ExamePage/ExamePage";
import { PacientePage } from "../pages/PacientePage/PacientePage";
import { useAuth } from "../hooks/useAuth";
import { ResetarSenhaPage } from "../pages/ResetarSenhaPage/ResetarSenhaPage";


export const AppRoutes = () => {
  const { usuario } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetarSenha" element={<ResetarSenhaPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            {usuario?.tipo === "ADMINISTRADOR" && (
              <Route path="/config" element={<h1>Teste</h1>} />
            )}
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastraexames" element={<ExamePage />} />

            <Route path="/cadastrapaciente" element={<PacientePage />} />
            <Route path="/editapaciente/:id" element={<PacientePage />} />

            <Route path="/editaexame/:id" element={<ExamePage />} />
            <Route path="/busca" element={<Search />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
