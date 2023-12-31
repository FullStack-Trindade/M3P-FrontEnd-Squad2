import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext"
import PacienteForm from '../../components/Form/PacienteForm/PacienteForm';


export const PacientePage = () => {
    const { setTitulo } = useToolbarContext();

    const { id } = useParams();


    useEffect(() => {
        { id ? setTitulo("Editar Paciente") : setTitulo("Cadastrar Paciente") }
    }, [id, setTitulo]);
    
    return (
        <>
        {id ? <PacienteForm isEditing={true}/> : <PacienteForm isEditing={false}/>}
        </>
    )

}