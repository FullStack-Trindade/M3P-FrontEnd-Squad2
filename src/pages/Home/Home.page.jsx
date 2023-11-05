import { useEffect, useState } from "react";
import { useToolbarContext } from "../../hooks/useToolbarContext";
import {
  FaUser,
  FaStethoscope,
  FaPills,
  FaFlask,
  FaWeight,
} from "react-icons/fa";
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
import Search from "../../components/Search/Search";

export const HomePage = () => {
  const exameService = new ExameService();
  const { setTitulo } = useToolbarContext();
  const { usuario } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredUsuario, setFilteredUsuario] = useState([]);
  const [searchValue, setSearchValue] = useState("")
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

      const filtraPaciente = dataPaciente.filter((paciente) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const lowerCaseNome = paciente.nome_completo.toLowerCase();
        const lowerCaseTelefone = paciente.telefone.toLowerCase();
        const lowerCaseEmail = paciente.email.toLowerCase();
        
        return (
          lowerCaseNome.includes(lowerCaseSearchValue) ||
          lowerCaseTelefone.includes(lowerCaseSearchValue) ||
          lowerCaseEmail.includes(lowerCaseSearchValue)
        );
      });
    
      setFilteredPatients(filtraPaciente);

    };
    const fetchUsuario = async () => {
      const dataUsuario = await UsuarioService.getUsuarios(token);
      
      setUsuarios(dataUsuario);

      const filtraUsuario = dataUsuario.filter((usuario) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const lowerCaseNome = usuario.nomeCompleto.toLowerCase();
        const lowerCaseTelefone = usuario.telefone.toLowerCase();
        const lowerCaseEmail = usuario.email.toLowerCase();
        
        return (
          lowerCaseNome.includes(lowerCaseSearchValue) ||
          lowerCaseTelefone.includes(lowerCaseSearchValue) ||
          lowerCaseEmail.includes(lowerCaseSearchValue)
        );
      });
    
      setFilteredUsuario(filtraUsuario);
     
    };
  
  
    usuario?.tipo === "ADMINISTRADOR"
      ? (setTitulo("ESTATÍSTICAS E INFORMAÇÕES ADMINISTRADOR"),
        console.log("teste adm"),
        fetchPaciente(),
        fetchUsuario())
      : (setTitulo("ESTATÍSTICAS E INFORMAÇÕES GERAIS"),
        console.log("teste else"),
      
        fetchPaciente());

      
  }, [searchValue, setTitulo]);

  return (
    <>
      {usuario?.tipo === "ADMINISTRADOR" ? (
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
          <Styled.Title>Busca</Styled.Title>
          <Search setSearchValue={setSearchValue} />
          <Styled.Title>Informações de Pacientes</Styled.Title>
          {pacientes.map((paciente, index) => (
            <CardPaciente key={index} paciente={paciente} />
          ))}

          <Styled.Title>Informações de Usuarios</Styled.Title>
          {usuarios.map((user, index) => (
            <CardUsuario key={index} user={user} />
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
          <Styled.Title>Busca</Styled.Title>
          <Search setSearchValue={setSearchValue} />
          <Styled.Title>Informações de Pacientes</Styled.Title>
         
          {pacientes.map((paciente, index) => (
            <CardPaciente key={index} paciente={paciente} />
          ))}
        </Styled.Container>
      )}
    </>
  );
};
