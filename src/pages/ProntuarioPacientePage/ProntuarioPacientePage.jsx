import  { useEffect, useState } from "react";
import ProntuarioService from "../../services/Prontuario/ProntuarioService";

//versão incial sem formatação


// Token obtido do local storage
const token = localStorage.getItem("@Auth:token");

export const ProntuarioPacientePage = () => {
  const [patientData, setPatientData] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const patientId = 3; // Defina o ID do paciente aqui
      const patientDetails = await ProntuarioService.getPatientById(patientId, token);
      setPatientData(patientDetails);
      setConsultas(patientDetails.consultas);
      setExames(patientDetails.exames);
      setMedicamentos(patientDetails.medicamentos);
    } catch (error) {
      console.error(error.message);
      // Trate o erro adequadamente
    }
  };

  return (
    <div>
      {patientData && (
        <div>
          <h2>{patientData.nome_completo}</h2>
          <p>CPF: {patientData.cpf}</p>
          <p>Gênero: {patientData.genero}</p>
          <p>Data de Nascimento: {patientData.data_nascimento}</p>


          <h3>Consultas</h3>
          {consultas.length > 0 ? (
            <ul>
              {consultas.map((consulta) => (
                <li key={consulta.id}>
                  {consulta.dataConsulta} - {consulta.horaConsulta}: {consulta.motivo}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma consulta registrada.</p>
          )}

          <h3>Exames</h3>
          {exames.length > 0 ? (
            <ul>
              {exames.map((exame) => (
                <li key={exame.id}>
                  {exame.dataExame} - {exame.horaExame}: {exame.nomeExame}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum exame registrado.</p>
          )}

          <h3>Medicamentos</h3>
          {medicamentos.length > 0 ? (
            <ul>
              {medicamentos.map((medicamento) => (
                <li key={medicamento.id}>
                  Nome do Medicamento: {medicamento.nomeMedicamento}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum medicamento registrado.</p>
          )}
        </div>
      )}
    </div>
  );
};