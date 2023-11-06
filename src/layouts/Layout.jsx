/* import { Btn } from "../components/Button/button.style"*/
import { ToolbarComponent } from "../components/Toolbar/Toolbar.component"
import { ToolbarTituloProvider } from "../contexts/ToolbarTitulo/ToolbarTitulo.context"
import SidebarComponent from "../components/Sidebar/Sidebar.component"
import ModalComponent from "../components/Modal/Modal.component"
import SuccessComponent from "../components/Success/Success.component"
import { useContext, useEffect } from "react"
import { Outlet } from "react-router"
import { ModalContext } from "../contexts/Modal.context"
import * as Styled from "./Layout.style"

export default function Layout() {

	const { show, setShow } = useContext(ModalContext)

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<>
			<ToolbarTituloProvider>
				<Styled.LayoutContainer>
					<SidebarComponent />
					<Styled.LayoutMain>
						<ToolbarComponent />
						<Styled.LayoutContent>
							<Outlet />
						</Styled.LayoutContent>
						{/*	<h4>Botões e suas variantes</h4>
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
						</div> */}
					</Styled.LayoutMain>
				</Styled.LayoutContainer>
			</ToolbarTituloProvider>
			<ModalComponent show={show} >
				<SuccessComponent />
			</ModalComponent>
		</>
	)
}
