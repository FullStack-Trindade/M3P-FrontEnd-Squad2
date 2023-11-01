// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useMenu } from "../../contexts/menu/menu.context";
import PacienteForm from '../../components/Form/PacienteForm';


export const PacientePage = () => {
    // const { setTittle } = useMenu();

    const { id } = useParams();

    // useEffect(() => {
    //     {setTittle('CADASTRO DE PACIENTE')}
    //   }, [setTittle]);
    
    return (
        <>
        {id ? <PacienteForm isEditing={true}/> : <PacienteForm isEditing={false}/>}
        </>
    )

}