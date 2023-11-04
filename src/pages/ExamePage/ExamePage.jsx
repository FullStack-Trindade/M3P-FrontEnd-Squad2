import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToolbarTituloContext } from "../../contexts/ToolbarTitulo/ToolbarTitulo.context";
import ExameForm from "../../components/Form/ExameForm/ExameForm.component";
import ExameService from "../../services/Exame/ExameService";
import Search from "../../components/Busca/Search";
import PacienteService from "../../services/Paciente/PacienteService";

export const ExamePage = () => {
  const { setTitulo } = useContext(ToolbarTituloContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const service = new ExameService();

  useEffect(() => {
    setTitulo(id ? "EDITAR EXAME" : "CADASTRAR EXAME");
    if (id) {
      const exameData = service.GetById(parseInt(id, 10));
      if (exameData) {
        const pacienteData = PacienteService.getPacientePorId(exameData.id);
        setSelectedPatient(pacienteData);
      } else {
        console.error(`Exame com ID ${id} não encontrado.`);
      }
    }
  }, [setTitulo, id, navigate]);

  const handlePatient = (paciente) => {
    setPaciente(paciente);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column",width:"98%"}}>
        <Search pacienteSelecionado={handlePatient} />
        {id ? <ExameForm isEditing={true} /> : <ExameForm isEditing={false} />}
      
      </div>
    </>
  );
};
