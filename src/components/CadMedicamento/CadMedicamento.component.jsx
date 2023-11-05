import { Container } from "react-bootstrap"
import InputComponent from "../Input/Input.component"
import { Btn } from "../Button/button.style"
import * as Styled from "./cadMedicamento.style"
import {
	Error,
	Label,
	Select,
	TextArea,
	InputGroup,
	Input,
} from "../Input/Input.style"
import { useContext, useEffect } from "react"
import { SidebarContext } from "../../contexts/SidebarContext"
import { useForm } from "react-hook-form"
import { api } from "../../api/api"

export default function CadMedicamentoComponent() {
	const { showSidebar } = useContext(SidebarContext)

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// const handleChange = (value) => {
	// 	handleSearch(value)
	// }

	const onSubmit = (data) => {
		console.log(data)
	}

	const handleSearch = (value) => {
		api.get(value)
		// fetch("http://localhost:3000/pacientes")
		// 	.then((res) => res.json())
		// 	.then((json) => {
		// 		const result = json.filter((paciente) => {
		// 			return (
		// 				(value && paciente.nome.toLowerCase().includes(value))
		// 			)
		// 		})
		// 		return result
		// 	})
	}

	const getDate = () => {
		const year = new Date().getFullYear()
		const month = new Date().toLocaleString("default", { month: "2-digit" })
		const day = new Date().toLocaleString("default", { day: "2-digit" })

		const hoje = `${year}-${month}-${day}`
		setValue("data", hoje)
	}

	const getTime = () => {
		const horario = new Date().toLocaleTimeString().slice(0, 5)
		setValue("horario", horario)
	}

	useEffect(() => {
		getDate()
		getTime()
	}, [])

	return (
		<>
			<Container
				style={{
					padding: "1rem",
					flex: "1 1",
					marginLeft: showSidebar ? "200px" : "60px",
				}}
			>
				{/* Busca do Paciente */}
				<InputComponent
					placeholder="Digite o nome do paciente"
					label="Paciente"
					onChange={(e) => handleSearch(e.target.value)}
				/>

				{/* Inicio do formulário */}
				<Styled.Form onSubmit={handleSubmit(onSubmit)}>
					<InputGroup>
					<Label htmlFor="nome">Nome do Medicamento</Label>
						<Input
							type="text"
							placeholder="Digite o nome do Medicamento"
							label="Nome do Medicamento"
							id="nome"
							{...register("nome", {
								required: "Nome do medicamento é obrigatório",
								maxLength: {
									value: 100,
									message:
										"O medicamento deve conter no máximo 100 caracteres",
								},
								minLength: {
									value: 5,
									message:
										"O medicamento deve ter no mínimo 5 caracteres",
								},
							})}
						/>
						{errors.nome && <Error>{errors.nome.message}</Error>}
					</InputGroup>

					<div
						style={{
							display: "flex",
							flex: "0 1 40%",
							gap: "1rem",
							marginTop: "1rem",
						}}
					>
						<InputGroup>
						<Label htmlFor="data">Data</Label>
							<Input
								type="date"
								label="Data"
								id="data"
								{...register("data", { required: "Informe a data" })}
							/>
							{errors.data && <Error>{errors.data.message}</Error>}
						</InputGroup>

						<InputGroup>
						<Label htmlFor="horario">Horario</Label>
							<Input
								type="time"
								label="Horario"
								id="horario"
								{...register("horario", {
									required: "informe o horário",
								})}
							/>
							{errors.horario && <Error>{errors.horario.message}</Error>}
						</InputGroup>
					</div>
					<div
						style={{
							display: "flex",
							flex: "1 1 30%",
							gap: "1rem",
							marginTop: "1rem",
						}}
					>
						<InputGroup>
							<Label htmlFor="tipo">Tipo</Label>
							<Select
								name="tipo"
								id="tipo"
								{...register("tipo", { required: "Informe um tipo" })}
							>
								<option value="capsula">Cápsula</option>
								<option value="comprimido">Comprimido</option>
								<option value="liquido">Líquido</option>
								<option value="creme">Creme</option>
								<option value="gel">Gel</option>
								<option value="inalacao">Inalação</option>
								<option value="injecao">Injeção</option>
								<option value="spray">Spray</option>
							</Select>
							{errors.tipo && <Error>{errors.tipo.message}</Error>}
						</InputGroup>

						<InputGroup>
							<Label htmlFor="quantidade">Quantidade</Label>
							<Input
								type="number"
								label="Quantidade"
								id="quantidade"
								step={0.01}
								placeholder="0,00"
								{...register("quantidade", {
									required: "Informe a quantidade",
								})}
							/>
							{errors.quantidade && (
								<Error>{errors.quantidade.message}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="unidade">Unidade</Label>
							<Select
								name="unidade"
								id="unidade"
								{...register("unidade", {
									required: "Informe a unidade",
								})}
							>
								<option value="g">g</option>
								<option value="mg">mg</option>
								<option value="mcg">mcg</option>
								<option value="ml">ml</option>
								<option value="%">%</option>
							</Select>
							{errors.unidade && <Error>{errors.unidade.message}</Error>}
						</InputGroup>
					</div>
					<InputGroup style={{ marginTop: "1rem" }}>
						<Label htmlFor="observacoes">Observações</Label>
						<TextArea
							placeholder="Digite as observações"
							id="observacoes"
							{...register("observacoes", {
								required: "Informe as observações",
								minLength: {
									value: 10,
									message: "mínimo de 10 caracteres",
								},
								maxLength: {
									value: 1000,
									message: "máximo de 1000 caracteres",
								},
							})}
						/>
						{errors.observacoes && (
							<Error>{errors.observacoes.message}</Error>
						)}
					</InputGroup>

					<Styled.ActionsContainer>
						<Btn type="submit" variant="primary">
							Cadastrar
						</Btn>
						<Btn variant="outlined">Editar</Btn>
						<Btn variant="redOutlined">Excluir</Btn>
					</Styled.ActionsContainer>
				</Styled.Form>
			</Container>
		</>
	)
}
