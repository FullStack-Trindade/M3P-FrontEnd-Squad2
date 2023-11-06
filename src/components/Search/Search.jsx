import React from "react";
import InputComponent from "../Input/Input.component";

export default function Search({ setSearchValue }) {
  return (
    <InputComponent     
      type="text"
      placeholder="Digite o nome, telefone ou email do paciente"
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}
