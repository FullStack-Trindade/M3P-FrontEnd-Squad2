import { useParams } from "react-router-dom";
import CadastroConsultaForm from "../../components/Form/cadastroConsultaForm/CadastroConsultaForm";


export default function CadastroConsultaPage() {
    const { id } = useParams();
    
    return (
    <>
      
      {id ? <CadastroConsultaForm isEditing={true}/> : <CadastroConsultaForm isEditing={false}/>}
    </>
  );
}
