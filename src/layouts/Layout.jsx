import { Btn } from "../components/Button/button.style";
import { ToolbarComponent } from "../components/Toolbar/Toolbar.component";
import { ToolbarTituloProvider } from "../contexts/ToolbarTitulo/ToolbarTitulo.context";

export default function Layout() {
	return (
		<ToolbarTituloProvider>
			<div>
				Layout is render
				<div>
					<ToolbarComponent />
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
	);
}
