import { Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import SidebarComponent from "../../components/Sidebar/Sidebar.component"
import InputComponent from "../../components/Input/Input.component"
import { MedicamentoContainer } from "./medicamento.style"
import CadMedicamentoComponent from "../../components/CadMedicamento/CadMedicamento.component"
import { ToolbarComponent } from "../../components/Toolbar/Toolbar.component"

export default function CadMedicamento() {
	return (
		<>
			<CadMedicamentoComponent />
		</>
	)
}
