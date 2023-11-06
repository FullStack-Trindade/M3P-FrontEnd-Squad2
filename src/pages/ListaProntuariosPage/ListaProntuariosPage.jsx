import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import * as Styled from "./ListaProntuariosPage.style";
import ProntuarioService from "../../services/Prontuario/ProntuarioService";


//versão inicial sem formatação adequada

//token consumindo do local storage
const token = localStorage.getItem("@Auth:token");

export const ListaProntuariosPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const patientsData = await ProntuarioService.getAllPacientes(token);
      if (patientsData) {
        setPatients(patientsData);
        console.log(patientsData);
      } else {
        // Nenhum paciente encontrado, você pode mostrar uma mensagem para o usuário.
      }
    } catch (error) {
      console.error(error.message);
      // Trate o erro adequadamente, como exibindo uma mensagem de erro.
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.nome_completo.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCardClick = (patientId) => {
    window.location.href = `/listaprontuario/${patientId}`;
  };

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: "#f6f8fb", width: "100%", padding: 0 }}
      >
        <Styled.StyledLabel>
          Utilize a barra de pesquisa para buscar
        </Styled.StyledLabel>
        <Styled.PatientList>
          <Styled.SearchInput
            type="text"
            placeholder="Digite o nome..."
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="table-responsive">
            <table
              className="table table-hover align-middle text-center"
              style={{ borderCollapse: "separate", borderSpacing: "0 2rem" }}
            >
              <thead>
                <tr>
                  <th className="fs-5" scope="col">
                    <Styled.StyledTittle>Registro</Styled.StyledTittle>
                  </th>
                  <th className="fs-5" scope="col">
                    <Styled.StyledTittle>Paciente</Styled.StyledTittle>
                  </th>
                  <th className="fs-5" scope="col">
                    <Styled.StyledTittle>Convênio</Styled.StyledTittle>
                  </th>
                  <th className="fs-5" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <Styled.PatientRow
                    key={patient.id}
                    onClick={() => handleCardClick(patient.id)}
                  >
                    <td>
                      <Styled.StyledData>
                        {patient.id?.toString()?.padStart(10, "0")}
                      </Styled.StyledData>
                    </td>
                    <td>
                      <Styled.StyledData>
                        {patient.nome_completo}
                      </Styled.StyledData>
                    </td>
                    <td>
                      <Styled.StyledData>
                        {patient.nome_convenio || "Sem Plano"}
                      </Styled.StyledData>
                    </td>
                    <td className="text-end">
                      <Styled.IconWrapper>
                        Acessar prontuário
                      </Styled.IconWrapper>
                    </td>
                  </Styled.PatientRow>
                ))}
              </tbody>
            </table>
          </div>
        </Styled.PatientList>
      </Container>
    </>
  );
};
