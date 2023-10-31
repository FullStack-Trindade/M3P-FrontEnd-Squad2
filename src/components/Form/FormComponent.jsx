import { useState } from "react";
import PropTypes from "prop-types";
import * as Styled from "./Form.style";
import { Btn } from "../Button/button.style";
import { Row } from "react-bootstrap";

export default function FormComponent({ title }) {
  const options = ["Médico", "Administrador", "Enfermeiro"];

  const [formData, setFormData] = useState({
    nome: "",
    genero: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.nome.length < 8 || formData.nome.length > 64) {
      newErrors.nome = "Nome deve ter entre 8 e 64 caracteres";
    }

    if (formData.tipo === "") {
      newErrors.tipo = "Selecione um tipo de usuário";
    }
  };
  return (
    <>
      <Styled.StyledForm onSubmit={handleSubmit}>
        <Styled.titulo>{title}</Styled.titulo>
        <Styled.GroupForm>
          <Row>
          <Styled.Label>Nome completo:</Styled.Label>
          <Styled.Input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />

          <Styled.Label>Gênero:</Styled.Label>
          <Styled.Select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </Styled.Select>

          <Styled.Label>CPF:</Styled.Label>
          <Styled.Input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
</Row>
<Row>
          <Styled.Label> Telefone</Styled.Label>
          <Styled.Input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />

          <Styled.Label>Email</Styled.Label>
          <Styled.Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Styled.Label>Senha</Styled.Label>
          <Styled.Input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
</Row>
<Row>
          <Styled.Label>Tipo:</Styled.Label>
          <Styled.Select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Styled.Select> 
          <Btn variant="primary" style={{ width: "150px", height: "50px", marginLeft: "200px"}}>
          Cadastrar
        </Btn>
        </Row>
        </Styled.GroupForm>

       
      </Styled.StyledForm>
    </>
  );
}

FormComponent.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
