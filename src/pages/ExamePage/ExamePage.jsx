import { useContext, useEffect, useState } from "react";
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
  const [selectedPatient, setSelectedPatient] = useState(null);

  const service = new ExameService();

  useEffect(() => {
    setTitulo(id ? "EDITAR EXAME" : "CADASTRAR EXAME");
    if (id) {
      const exameData = service.GetById(parseInt(id));
      if (exameData) {
        const pacienteData = PacienteService.getPacientePorId(id);
        setSelectedPatient(pacienteData);
      } else {
        console.error(`Exame com ID ${id} não encontrado.`);
      }
    }
  }, [setTitulo, id, navigate]);

  const handlePatient = (paciente) => {
    setSelectedPatient(paciente);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "98%" }}>
        {id ? (
          <ExameForm isEditing={true} setSelectedPatient={selectedPatient} />
        ) : (
          <>
            <Search pacienteSelecionado={handlePatient} />
            <ExameForm isEditing={false} setSelectedPatient={selectedPatient} />
          </>
        )}
      </div>
    </>
  );
};
