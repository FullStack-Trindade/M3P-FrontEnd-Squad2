import { useParams } from "react-router-dom";
import CadastroConsultaForm from "../../components/Form/cadastroConsultaForm/CadastroConsultaForm";
import SidebarComponent from "../../components/Sidebar/Sidebar.component";
import { ToolbarComponent } from "../../components/Toolbar/Toolbar.component";

export default function CadastroConsultaPage() {
    const { id } = useParams();
    
    return (
    <>
      <ToolbarComponent />
      <SidebarComponent />
      {id ? <CadastroConsultaForm isEditing={true}/> : <CadastroConsultaForm isEditing={false}/>}
    </>
  );
}
