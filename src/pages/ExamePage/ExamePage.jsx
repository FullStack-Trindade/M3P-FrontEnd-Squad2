import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToolbarTituloContext } from "../../contexts/ToolbarTitulo/ToolbarTitulo.context";
import ExameForm from "../../components/Form/ExameForm/ExameForm.component";
import ExameService from "../../services/Exame/ExameService";
import Search from "../../components/Busca/Seach";

export const ExamePage = () => {
  const { setTitulo } = useContext(ToolbarTituloContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const service = new ExameService();

  useEffect(() => {
    setTitulo(id ? "EDITAR EXAME" : "CADASTRAR EXAME");
  }, [id, navigate]);

  const handlePatient = (patient) => {
    setPaciente(patient);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column",width:"98%"}}>
        <Search pacienteId={handlePatient} />
        {id ? <ExameForm isEditing={true} /> : <ExameForm isEditing={false} />}
      
      </div>
    </>
  );
};
