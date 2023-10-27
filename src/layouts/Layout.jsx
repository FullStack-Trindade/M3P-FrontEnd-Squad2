import InputComponent from "../components/Input/Input.component";
import { Btn } from "../components/Button/button.style"

export default function Layout() {
	return (
		<div>
			Layout is render
      <InputComponent type="text" id="ss" mask="999.999.999-99" label="cpf"></InputComponent>
			<div>
				<h4>Botões e suas variantes</h4>
				<div style={{display: 'flex', gap: '1rem'}}>
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
	)

}
