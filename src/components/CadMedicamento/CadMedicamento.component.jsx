import { Container, Form, InputGroup } from "react-bootstrap"
import InputComponent from "../Input/Input.component"
import { Btn } from "../Button/button.style"
import * as Styled from './cadMedicamento.style'
import { Label, Select, TextArea } from "../Input/Input.style"
import { useContext } from "react"
import { SidebarContext } from "../../contexts/SidebarContext"

export default function CadMedicamentoComponent() {
	const { showSidebar } = useContext(SidebarContext)


	// const handleChange = (value) => {
	// 	handleSearch(value)
	// }

	const handleSearch = (value) => {
		fetch("http://localhost:3000/pacientes")
			.then((res) => res.json())
			.then((json) => {
				const result = json.filter((paciente) => {
					return (
						(value && paciente.nome.toLowerCase().includes(value))
					)
				})
				return result
			})
	}

	return (
		<>
			<Container style={{ padding: "1rem", flex: "1 1", marginLeft: showSidebar ? "200px" : "60px" }}>

				{/* Busca do Paciente */}
                <InputComponent placeholder="Digite o nome do paciente" label="Paciente" onChange={(e) => handleSearch(e.target.value)} />

				{/* Inicio do formulário */}
				<Styled.Form onSubmit={(e) => {e.preventDefault(), console.log('enviado')}}>
					<InputComponent
						type="text"
						placeholder="Digite o nome do Medicamento"
						label="Nome do Medicamento"
						id="nomeMedicamento"
					/>

					<div
						style={{
							display: "flex",
							flex: "0 1 40%",
							gap: "1rem",
							marginTop: "1rem",
						}}
					>
						<InputComponent type="date" label="Data" id="data" />
						<InputComponent type="time" label="Horario" id="horario" />
					</div>
					<div
						style={{
							display: "flex",
							flex: "1 1 30%",
							gap: "1rem",
							marginTop: "1rem",
						}}
					>
						<div>
							<Label htmlFor="tipo">Tipo</Label>
							<Select name="tipo" id="tipo">
								<option value="capsula">Cápsula</option>
								<option value="comprimido">Comprimido</option>
								<option value="liquido">Líquido</option>
								<option value="creme">Creme</option>
								<option value="gel">Gel</option>
								<option value="inalacao">Inalação</option>
								<option value="injecao">Injeção</option>
								<option value="spray">Spray</option>
							</Select>
						</div>

                    <InputComponent type="number" label="Quantidade" id="quantidade" step="0.01" />
                        <div>
                            <Label htmlFor="unidade">Unidade</Label>
                            <Select name="unidade" id="unidade">
                                <option value="g">g</option>
                                <option value="mg">mg</option>
                                <option value="mcg">mcg</option>
                                <option value="ml">ml</option>
                                <option value="%">%</option>
                            </Select>
                        </div>
					</div>
					
					<TextArea label="Observações" id="observacoes" />

                    <Styled.ActionsContainer>
                        <Btn type="submit" variant="primary">Cadastrar</Btn>
                        <Btn variant="outlined">Editar</Btn>
                        <Btn variant="redOutlined">Excluir</Btn>
                    </Styled.ActionsContainer>
				</Styled.Form>
			</Container>
		</>
	)
}
