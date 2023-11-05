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
import UsuarioService from "../../services/Usuario/Usuario.service";

import { COLOR } from "../../assets/styles/colors";
import * as Styled from "./home.style";
import CardComponent from "../../components/Card/CardComponent/CardComponent";
import CardPaciente from "../../components/Card/CardPaciente/CardPaciente";
import CardUsuario from "../../components/Card/CardUsuario/CardUsuario";
import listateste from "../../components/lista";

export const HomePage = () => {
  const exameService = new ExameService();
  const { setTitulo } = useToolbarContext();
  const { usuarioAuth } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("@Auth:token");
  /* console.log(token) */
  const dietas = async () => {
    await DietaService.getDietas(token);
  };
  const exames = async () => {
    await exameService.getExames(token);
  };
  /*   const medicamentos = async () => {
    await medicamentosService.getExames(token);
  };
  const exercicios = async () => {
    await exerciciosService.getExames(token);

  const consulta = async () => {
    await consultaService.getExames(token);
  }; */

  useEffect(() => {
    const fetchPaciente = async () => {
      const dataPaciente = await PacienteService.getPacientes(token);
      setPacientes(dataPaciente);
    };
    const fetchUsuario = async () => {
      const dataUsuario = await UsuarioService.getUsuarios(token);
      setUsuarios(dataUsuario);
    };

    if (usuarioAuth?.tipo === "ADMINISTRADOR") {
      setTitulo("ESTATÍSTICAS E INFORMAÇÕES ADMINISTRADOR");
      fetchPaciente();
      fetchUsuario();
    } else {
      setTitulo("ESTATÍSTICAS E INFORMAÇÕES GERAIS");
      fetchPaciente();
    }
  }, [setTitulo]);

  return (
    <>
      {usuarioAuth?.tipo === "ADMINISTRADOR" ? (
        <Styled.Container>
        <Styled.Title>Estatísticas do Sistema</Styled.Title>
      <Styled.Content>
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
        <div>
          <CardComponent
            title="Usuarios Cadastrados"
            value={usuarios.length}
            icon={<FaUser />}
            color={COLOR.$black_light}
          />
        </div>
      </Styled.Content>

          <Styled.Title>Informações de Pacientes</Styled.Title>
          {pacientes.map((paciente, index) => (
            <CardPaciente key={index} paciente={paciente} />
          ))}

          <Styled.Title>Informações de Usuarios</Styled.Title>
          {usuarios.map((usuario, index) => (
            <CardUsuario key={index} usuario={usuario} />
          ))}
        </Styled.Container>
      ) : (
        <Styled.Container>
         
          <Styled.Title>Estatísticas do Sistema</Styled.Title>
          <Styled.Content>
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
          </Styled.Content>

          <Styled.Title>Informações de Pacientes</Styled.Title>
          {pacientes.map((paciente, index) => (
            <CardPaciente key={index} paciente={paciente} />
          ))}
        </Styled.Container>
      )}
    </>
  );
};
/*  
Poderá existir duas listagens e dois inputs de pesquisa na tela inicial. 

. Na listagem de pacientes, deverá existir
 um campo para buscar pelo nome, cpf, telefone ou e-mail. 
 */
