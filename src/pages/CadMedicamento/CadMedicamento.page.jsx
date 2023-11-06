import { useParams } from "react-router"
import CadMedicamentoComponent from "../../components/CadMedicamento/CadMedicamento.component"
import { useToolbarContext } from "../../hooks/useToolbarContext"
import { useEffect } from "react"

export default function CadMedicamento() {
	const { setTitulo } = useToolbarContext()
	const { id } = useParams()

	useEffect(() => {
		{
			id
				? setTitulo("Editar Medicamento")
				: setTitulo("Cadastrar Medicamento")
		}
	}, [id, setTitulo])

	return (
		<>
			{id ? (
				<CadMedicamentoComponent isEditing={true} />
			) : (
				<CadMedicamentoComponent isEditing={false} />
			)}
		</>
	)
}
