// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext"
import DietaForm from '../../components/Form/DietaForm/DietaForm';


export const DietaPage = () => {
    const { setTitulo } = useToolbarContext();

    const { id } = useParams();


    useEffect(() => {
        { id ? setTitulo("Editar Dieta") : setTitulo("Cadastrar Dieta") }
    }, [id, setTitulo]);
    
    return (
        <>
        {id ? <DietaForm isEditing={true}/> : <DietaForm isEditing={false}/>}
        </>
    )

}