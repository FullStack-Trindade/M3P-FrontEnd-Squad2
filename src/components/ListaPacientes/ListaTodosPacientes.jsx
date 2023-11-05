import { useState } from 'react';
import { useForm } from 'react-hook-form';
import  DietaService  from '../../services/Dieta/DietaService';
import { StyledForm, StyledInput, StyledLabel, EqualDivider, StyledButton, Child } from './ListaTodosPacientes.styled';
import PropTypes from 'prop-types';

//token consumindo do local storage
const token = localStorage.getItem("@Auth:token");

const ListaTodosPacientes = ({ onSelectPaciente }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [ resultados, setResultados] = useState([]);
  const [ loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const pacientes = await DietaService.listarPacientes(token);
      const pacientesFiltrados = pacientes.filter((paciente) =>
        paciente.nome_completo && paciente.nome_completo.toLowerCase().includes(data.search.toLowerCase())
      );
      setResultados(pacientesFiltrados);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionaPaciente = (paciente) => {
    onSelectPaciente(paciente);
    setResultados([]);
    setValue('search', '');
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <EqualDivider>
        <Child>
          <StyledLabel>Pesquisar paciente por nome:</StyledLabel>
          <StyledInput
            type="text"
            {...register('search')}
            placeholder="Digite o nome do paciente"
          />
        </Child>
        <Child>
          <StyledLabel>&nbsp;</StyledLabel>
          <StyledInput type="submit" value="Buscar" />
        </Child>
      </EqualDivider>
      {loading && <div>Carregando...</div>}
      <EqualDivider>
        {resultados.map((paciente) => (
          <Child key={paciente.id}>
            <StyledButton type="button" onClick={() => handleSelecionaPaciente(paciente)}>
            <StyledLabel $bt>{paciente.nome_completo}</StyledLabel>
            <StyledLabel $bt $tittle>{paciente.nome_convenio}{!paciente.nome_convenio && 'Sem plano'}</StyledLabel>
            </StyledButton>
          </Child>
        ))}
      </EqualDivider>
    </StyledForm>
  );
};

export default ListaTodosPacientes;

ListaTodosPacientes.propTypes = {
  onSelectPaciente: PropTypes.func.isRequired,
};
