import { Container, Form, InputGroup } from "react-bootstrap"
import InputComponent from "../Input/Input.component"
import { Btn } from "../Button/button.style"
import * as Styled from './cadMedicamento.style'

export default function CadMedicamentoComponent() {
	return (
		<>
			<Container style={{ padding: "1rem", flex: "1 1" }}>
				<h4>Cadastro de Medicamento</h4>

                <p>*** Inserir uma Busca de paciente</p>

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
							<label htmlFor="tipo">Tipo</label>
							<select name="tipo" id="tipo">
								<option value="capsula">Cápsula</option>
								<option value="comprimido">Comprimido</option>
								<option value="liquido">Líquido</option>
								<option value="creme">Creme</option>
								<option value="gel">Gel</option>
								<option value="inalacao">Inalação</option>
								<option value="injecao">Injeção</option>
								<option value="spray">Spray</option>
							</select>
						</div>

                    <InputComponent type="number" label="Quantidade" id="quantidade" step="0.01" />

						{/* <div>
							<label htmlFor="quantidade">Quantidade</label>
							<input
								type="number"
								step="0.01"
								name="quantidade"
								id="quantidade"
                                placeholder="0,00"
							/>
						</div> */}
                        <div>
                            <label htmlFor="unidade">Unidade</label>
                            <select name="unidade" id="unidade">
                                <option value="g">g</option>
                                <option value="mg">mg</option>
                                <option value="mcg">mcg</option>
                                <option value="ml">ml</option>
                                <option value="%">%</option>
                            </select>
                        </div>
					</div>
                    <InputComponent type="textarea" label="Observações" id="observacoes" />

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
