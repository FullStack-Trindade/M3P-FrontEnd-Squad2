import { Container } from "react-bootstrap"
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
import { useContext, useEffect, useState } from "react"
import { SidebarContext } from "../../contexts/SidebarContext"
import { useForm } from "react-hook-form"
import ListaTodosPacientes from "../ListaPacientes/ListaTodosPacientes"
import MedicamentoService from "../../services/Medicamento.service"
import { toast } from "react-toastify"
import { useParams } from "react-router"

export default function CadMedicamentoComponent({ isEditing }) {
	const { showSidebar } = useContext(SidebarContext)
	const [paciente_id, setPacienteId] = useState(null)
	const [pacienteNome, setPacienteNome] = useState("")
	const [statusDoSistema, setStatus] = useState(true)
	const { id } = useParams()

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm()

	//token consumindo do local storage
	const token = localStorage.getItem("@Auth:token")

	const onSubmit = async (data) => {
		register("paciente_id", paciente_id)
		console.log({ paciente_id, ...data })

		try {
			if (id) {
				await MedicamentoService.Update(id, data, token)
				toast.success(`Medicamento ${data.nomeMedicamento} atualizado com sucesso`, {
					position: toast.POSITION.TOP_CENTER,
					theme: "colored",
					autoClose: 2000,
				})
			}

			setStatus(true)
			setValue("statusDoSistema", statusDoSistema)
			const dados = { ...data, statusDoSistema, paciente_id }
			console.log(dados)
			const res = await MedicamentoService.Create(dados, token)
			toast.success(
				`Cadastro do medicamento: ${res.nomeMedicamento} realizado com sucesso!`,
				{
					position: toast.POSITION.TOP_CENTER,
					theme: "colored",
					autoClose: 2000,
				}
			)
		} catch (error) {
			if (error.response && error.response.status === 409) {
				const errorMessage =
					error.response.data.message || "Erro desconhecido"
				toast.error(`Erro 409: ${errorMessage}`, {
					position: toast.POSITION.TOP_CENTER,
					theme: "colored",
					autoClose: 2000,
				})
			} else {
				toast.error(`Erro ao cadastrar Medicamento: ${error.message}`, {
					position: toast.POSITION.TOP_CENTER,
					theme: "colored",
					autoClose: 2000,
				})
			}
		}
	}

	const handleSelectPaciente = (selectedPaciente) => {
		console.log(selectedPaciente.id)
		setPacienteId(selectedPaciente.id)
		setPacienteNome(`Paciente: ${selectedPaciente.nome_completo}`)
	}

	// pega data atual do sistema
	const getDate = () => {
		const year = new Date().getFullYear()
		const month = new Date().toLocaleString("default", { month: "2-digit" })
		const day = new Date().toLocaleString("default", { day: "2-digit" })

		const hoje = `${year}-${month}-${day}`
		setValue("dataMedicamento", hoje)
	}

	// pega hora atual do sistema
	const getTime = () => {
		const horario = new Date().toLocaleTimeString().slice(0, 5)
		setValue("horaMedicamento", horario)
	}

	const handleDelete = async (id) => {
		try {
			const ok = await MedicamentoService.Excluir(id)
			console.log(ok)
		} catch (error) {
			console.error(error.message)
		}
	}

	// atualiza data e hora ao carregar a página
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
				}}
			>
				{/* Busca do Paciente */}
				<ListaTodosPacientes onSelectPaciente={handleSelectPaciente} />

				{pacienteNome && <Label>{pacienteNome}</Label>}

				{/* Inicio do formulário */}
				<Styled.Form onSubmit={handleSubmit(onSubmit)}>
					<InputGroup>
						<Label htmlFor="nomeMedicamento">Nome do Medicamento</Label>
						<Input
							type="text"
							placeholder="Digite o nome do Medicamento"
							label="Nome do Medicamento"
							id="nomeMedicamento"
							{...register("nomeMedicamento", {
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
						{errors.nomeMedicamento && (
							<Error>{errors.nomeMedicamento.message}</Error>
						)}
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
							<Label htmlFor="dataMedicamento">Data</Label>
							<Input
								type="date"
								label="Data"
								id="dataMedicamento"
								{...register("dataMedicamento", {
									required: "Informe a data",
								})}
							/>
							{errors.dataMedicamento && (
								<Error>{errors.dataMedicamento.message}</Error>
							)}
						</InputGroup>

						<InputGroup>
							<Label htmlFor="horaMedicamento">Horario</Label>
							<Input
								type="time"
								label="Horario"
								id="horaMedicamento"
								{...register("horaMedicamento", {
									required: "informe o horário",
								})}
							/>
							{errors.horaMedicamento && (
								<Error>{errors.horaMedicamento.message}</Error>
							)}
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
							<Label htmlFor="tipoMedicamento">Tipo</Label>
							<Select
								name="tipoMedicamento"
								id="tipoMedicamento"
								{...register("tipoMedicamento", {
									required: "Informe um tipo",
								})}
							>
								<option value="CAPSULA">Cápsula</option>
								<option value="COMPRIMIDO">Comprimido</option>
								<option value="LIQUIDO">Líquido</option>
								<option value="CREME">Creme</option>
								<option value="GEL">Gel</option>
								<option value="INALACAO">Inalação</option>
								<option value="INJECAO">Injeção</option>
								<option value="SPRAY">Spray</option>
							</Select>
							{errors.tipoMedicamento && (
								<Error>{errors.tipoMedicamento.message}</Error>
							)}
						</InputGroup>

						<InputGroup>
							<Label htmlFor="quantidadeMedicamento">Quantidade</Label>
							<Input
								type="number"
								label="Quantidade"
								id="quantidadeMedicamento"
								step={0.01}
								placeholder="0,00"
								{...register("quantidadeMedicamento", {
									required: "Informe a quantidade",
								})}
							/>
							{errors.quantidadeMedicamento && (
								<Error>{errors.quantidadeMedicamento.message}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="unidade">Unidade</Label>
							<Select
								name="unidadeMedicamento"
								id="unidadeMedicamento"
								{...register("unidadeMedicamento", {
									required: "Informe a unidade",
								})}
							>
								<option value="g">g</option>
								<option value="mg">mg</option>
								<option value="mcg">mcg</option>
								<option value="mL">ml</option>
								<option value="%">%</option>
							</Select>
							{errors.unidade && <Error>{errors.unidade.message}</Error>}
						</InputGroup>
					</div>
					<InputGroup style={{ marginTop: "1rem" }}>
						<Label htmlFor="observacoesMedicamento">Observações</Label>
						<TextArea
							placeholder="Digite as observações"
							id="observacoesMedicamento"
							{...register("observacoesMedicamento", {
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
						{isEditing && (
							<>
								<Btn variant="outlined">Editar</Btn>
								<Btn variant="redOutlined" onClick={() => handleDelete(id)}>Excluir</Btn>
							</>
						)}
					</Styled.ActionsContainer>
				</Styled.Form>
			</Container>
		</>
	)
}
