import { useParams } from "react-router-dom";
import CadastroConsultaForm from "../../components/Form/CadastroConsultaForm/CadastroConsultaForm"
import { useContext } from "react";
import { ToolbarTituloContext } from "../../contexts/ToolbarTitulo/ToolbarTitulo.context";


export default function CadastroConsultaPage() {
    const { id } = useParams();
    const {setTitulo} = useContext(ToolbarTituloContext);

    return (
    <>
      <h1>{setTitulo("Cadastro Consulta")}</h1>
      {id ? <CadastroConsultaForm isEditing={true}/> : <CadastroConsultaForm isEditing={false}/>}
    </>
  );
}
