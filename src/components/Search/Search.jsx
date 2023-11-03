import { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import axios from "axios";
import InputComponent from "../Input/Input.component";
import * as Styled from "./Search.style";

export default function Search({ data, endpoint }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [dadosPaciente, setDadosPaciente] = useState([]);
  const [dadosExame, setDadosExame] = useState([]);

  const BASE_URL = "http://localhost:3333/RESOURCE";
  let apiURL = BASE_URL.replace("RESOURCE", endpoint);
  useEffect(() => {
    axios.get("http://localhost:3333/api/pacientes").then((response) => {
      setDadosPaciente(response.data);
    });

    axios.get(apiURL).then((response) => {
      setDadosExame(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = dadosExame.filter((exame) => {
        return dadosPaciente.some(
          (paciente) =>
            paciente.name.toLowerCase() === searchInput.toLowerCase() &&
            paciente.id === exame.paciente_id
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(dadosExame);
    }
  };

  return (
    <Styled.InputContainer>
      <InputComponent
        type="search"
        placeholder="Digite o nome do Paciente"
        value={searchInput}
        onChange={(e) => searchItems(e.target.value)}
      ></InputComponent>
      <Styled.Icon type="submit" variant="primary">
        <SlMagnifier />
      </Styled.Icon>
      {filteredResults.map((item) => (
        <div>
          Id:{item.id}, Nome:{item.name}
        </div>
      ))}
    </Styled.InputContainer>
  );
}
