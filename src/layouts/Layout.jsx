import { Btn } from "../components/Button/button.style"
import { ToolbarComponent } from "../components/Toolbar/Toolbar.component"
import { ToolbarTituloProvider } from "../contexts/ToolbarTitulo/ToolbarTitulo.context"
import InputComponent from "../components/Input/Input.component"
import SidebarComponent from "../components/Sidebar/Sidebar.component"
import ModalComponent from "../components/Modal/Modal.component"

export default function Layout() {
	return (
		<>
			<ToolbarTituloProvider>
				<div style={{ display: "flex" }}>
					<SidebarComponent />
					<div>
						<ToolbarComponent />
						<InputComponent
							type="text"
							id="ss"
							mask="999.999.999-99"
							label="cpf"
						></InputComponent>
						<h4>Botões e suas variantes</h4>
						<div style={{ display: "flex", gap: "1rem" }}>
							<Btn variant="primary">primary</Btn>
							<Btn variant="outlined">outlined</Btn>
							<Btn variant="info">info</Btn>
							<Btn variant="red">red</Btn>
							<Btn variant="redOutlined">redOutlined</Btn>
							<Btn variant="green">green</Btn>
							<Btn variant="greenOutlined">greenOutlined</Btn>
							<Btn variant="blue">blue</Btn>
							<Btn variant="blueOutlined">blueOutlined</Btn>
						</div>
					</div>
				</div>
			</ToolbarTituloProvider>
      <ModalComponent>
        
      </ModalComponent>
		</>
	)
}
