import { useEffect, useState } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext";
import {
  FaUser,
  FaStethoscope,
  FaPills,
  FaFlask,
  FaWeight,
} from "react-icons/fa";
import { Container } from "react-bootstrap";
import { IoBarbellSharp } from "react-icons/io5";

import { useAuth } from "../../hooks/useAuth";
import ExameService from "../../services/Exame/ExameService";
import PacienteService from "../../services/Paciente/PacienteService";
import DietaService from "../../services/Dieta/DietaService";
import CardComponent from "../../components/Card/CardComponent";

import { COLOR } from "../../assets/styles/colors";
import * as Styled from "./home.style";
import CardPatient from "../../components/CardPaciente/CardPaciente";

export const HomePage = () => {
  const exameService = new ExameService();
  const { setTitulo } = useToolbarContext();
  const { usuario } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const token = localStorage.getItem("@Auth:token");

  const dietas = async () => {
    await DietaService.getDietas(token);
  };
  const exames = async () => {
    await exameService.getExames(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await PacienteService.getPacientes(token);
      setPacientes(data);
    };
   
    fetchData();

    usuario?.tipo === "ADMINISTRADOR"
      ? setTitulo("ESTATÍSTICAS E INFORMAÇÕES ADMINISTRADOR")
      : setTitulo("ESTATÍSTICAS E INFORMAÇÕES GERAIS");
  }, [setTitulo]);

  return (
    <>
      {usuario?.tipo === "ADMINISTRADOR" ? (
        <div style={{ width: "90%", margin: "auto" }}>
          <Styled.Title>Estatísticas do Sistema</Styled.Title>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <div>
              <CardComponent
                title="Pacientes Cadastrados"
                value={pacientes.length}
                icon={<FaUser />}
                color={COLOR.$black_light}
              />

              <CardComponent
                title="Exames Cadastrados"
                value={exames.length}
                icon={<FaFlask />}
                color={COLOR.$blue_light}
              />
            </div>
            <div>
              <CardComponent
                title="Consultas Cadastradas"
                value={exames.length}
                icon={<FaStethoscope />}
                color={COLOR.$blue_darkest}
              />

              <CardComponent
                title="Dietas Cadastradas"
                value={dietas.length}
                icon={<FaWeight />}
                color={COLOR.$white_darkest}
              />
            </div>
            <div>
              <CardComponent
                title="Exercicios Cadastrados"
                value={dietas.length}
                icon={<IoBarbellSharp />}
                color={COLOR.$black_medium}
              />
              <CardComponent
                title="Medicações Cadastradas"
                value={dietas.length}
                icon={<FaPills />}
                color={COLOR.$blue_lightest}
              />
            </div>
          </div>
          <div>
            <Styled.Title>Informações de Pacientes</Styled.Title>
            {pacientes.map((paciente, index) => (
              <CardPatient key={index} paciente={paciente} />
            ))}
          </div>
          {/* .  <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        <SearchBar setSearchValue={setSearchValue} />
        <Row>
          {filteredPatients.map((patient, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient patient={patient} />
            </Col>
          ))}
        </Row>
      </Container>  <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        <SearchBar setSearchValue={setSearchValue} />
        <Row>
          {filteredPatients.map((patient, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient patient={patient} />
            </Col> 
          ))}
        </Row>*/}
        </div>
      ) : (
        <Container>
          <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        </Container>
      )}
    </>
  );
};
/* 
deve conter as estatísticas do sistema que mudará se o usuário 
for administrador ou não. 
 Se for administrador a listagem não só mostrará os usuários do portal, 
como também os pacientes. 
Poderá existir duas listagens e dois inputs de pesquisa na tela inicial. 

. Na listagem de pacientes, deverá existir
 um campo para buscar pelo nome, cpf, telefone ou e-mail. 
 
    Ao clicar no card (ou em "ver mais"), a página de cadastro 
    de paciente deve ser aberta, com os botões de edição, 
    deleção e salvamento ativados. Nesta página, o usuário 
    poderá editar as informações ou deletar um paciente caso o
     mesmo não possua registros vinculados. */
