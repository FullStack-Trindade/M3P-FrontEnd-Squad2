import { useEffect } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext"
import UsuariosFormComponent from "../../components/Form/UsuariosForm/UsuariosForm.component";
import { useParams } from "react-router-dom";


export const CadastrarUsuariosPage = () => {

    const { setTitulo } = useToolbarContext();

    const { id } = useParams();


    useEffect(() => {
        { id ? setTitulo("Editar Usuário") : setTitulo("Cadastrar Usuário") }
    }, [id, setTitulo]);

    return (
        <>
            {id ? <UsuariosFormComponent isEditing={true} /> : <UsuariosFormComponent isEditing={false} />}
        </>
    )
}
