import { useContext } from "react";
import CadastroExercicioForm from "../../components/Form/CadastroExercicioForm/CadastroExercicioForm";
import { ToolbarTituloContext } from "../../contexts/ToolbarTitulo/ToolbarTitulo.context";
import { useParams } from "react-router-dom";


export default function CadastroExercicioPage(){
    const { id } = useParams();
    const {  setTitulo } = useContext(ToolbarTituloContext);

    if (id) {
        setTitulo("Editar Exercício");
      } else {
        setTitulo("Cadastro Exercício");
      }

    

    return(
        <>

       <h1>{setTitulo("Cadastro Exercicio")}</h1>

        {id ? <CadastroExercicioForm isEditing={true}/> : <CadastroExercicioForm isEditing={false}/>}
        </>
    )
}
