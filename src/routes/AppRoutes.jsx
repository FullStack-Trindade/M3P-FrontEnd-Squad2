import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFoundPage from "../pages/NotFound/NotFound.page";
import { LoginPage } from "../pages/LoginPage/Login.page";
import { PrivateRoutes } from "./PrivateRoutes";
import { HomePage } from "../pages/Home/Home.page";
import { ExamePage } from "../pages/ExamePage/ExamePage";
import { PacientePage } from "../pages/PacientePage/PacientePage";
import { DietaPage } from "../pages/DietaPage/DietaPage";
import { useAuth } from "../hooks/useAuth";
import { ResetarSenhaPage } from "../pages/ResetarSenhaPage/ResetarSenhaPage";
import { CadastrarUsuariosPage } from "../pages/CadastrarUsuariosPage/CadastrarUsuarios.page";
import CadMedicamento from "../pages/CadMedicamento/CadMedicamento.page"
import { LogsPage } from "../pages/LogsPage/Logs.page";
import { ListaProntuariosPage } from "../pages/ListaProntuariosPage/ListaProntuariosPage";
import { ProntuarioPacientePage } from "../pages/ProntuarioPacientePage/ProntuarioPacientePage";

export const AppRoutes = () => {
  const { usuario } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Inicio Rotas privadas */}
        <Route element={<PrivateRoutes />}>
          {/* Inicio do Layout */}
          <Route path="/" element={<Layout />}>
            {usuario?.tipo === "ADMINISTRADOR" && (
              <Route path="/config" element={<h1>Teste</h1>} />
            )}
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastraexames" element={<ExamePage />} />

            {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/config" element={<h1>Teste</h1>} />}
            {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/cadastrausuarios" element={<CadastrarUsuariosPage />} />}
            {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/editausuario/:id" element={<CadastrarUsuariosPage />} />}
            {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/logs" element={<LogsPage />} />}
            <Route path="/cadastrapaciente" element={<PacientePage />} />
            <Route path="/editapaciente/:id" element={<PacientePage />} />

            <Route path="/cadastraexame" element={<ExamePage />} />
            <Route path="/editaexame/:id" element={<ExamePage />} />

            <Route path="/cadastradieta" element={<DietaPage />} />
            <Route path="/editadieta/:id" element={<DietaPage />} />

            <Route path="/exames" element={<ExamePage />} />
            <Route path="/exames/:id" element={<ExamePage />} />
            <Route path="/medicamento" element={<CadMedicamento />} />
            <Route path="/medicamento/:nome" element={<CadMedicamento />} />

            <Route path="/listaprontuarios" element={<ListaProntuariosPage />} />
            <Route path="/listaprontuario/:id" element={<ProntuarioPacientePage />} />

          </Route>
          {/* Fim do Layout */}
        </Route>
        {/* Fim Rotas privadas */}

        {/* Rotas publicas abaixo: */}
        <Route path='/login' element={<LoginPage />} />
        <Route path="/resetarSenha" element={<ResetarSenhaPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  )
}
