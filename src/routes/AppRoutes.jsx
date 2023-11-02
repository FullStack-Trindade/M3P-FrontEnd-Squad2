import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "../layouts/Layout"
import NotFoundPage from "../pages/NotFound/NotFound.page"
import CadMedicamento from "../pages/CadMedicamento/CadMedicamento.page"
import { LoginPage } from "../pages/LoginPage/Login.page"
import { PrivateRoutes } from "./PrivateRoutes"
import { HomePage } from "../pages/Home/Home.page"
/* import { useAuth } from "../hooks/useAuth"; */

export const AppRoutes = () => {
	/* const { usuario } = useAuth(); */
	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/cadMedicamento" element={<CadMedicamento />} />
					{/* {usuario?.tipo === 'ADMINISTRADOR' && <Route path="/config" element={<h1>Teste</h1>} />} */}
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}
