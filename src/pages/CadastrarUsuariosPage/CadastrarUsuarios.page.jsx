import { useEffect } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext"
import UsuariosFormComponent from "../../components/Form/UsuariosForm/UsuariosForm.component";
import { useParams } from "react-router-dom";


export const CadastrarUsuariosPage = () => {

    const { setTitulo } = useToolbarContext();

    const { id } = useParams();


    useEffect(() => {
        { setTitulo('CADASTRO DE USUÁRIOS') }
    }, [setTitulo]);

    return (
        <>
            {id ? <UsuariosFormComponent isEditing={true} /> : <UsuariosFormComponent isEditing={false} />}
        </>
    )
}
