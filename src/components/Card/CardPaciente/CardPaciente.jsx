import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';

import * as Styled from './CardPaciente.style';
import  {COLOR}  from "../../../assets/styles/colors";


const calculateAge = (birthdate) => {
  const birthdateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthdateObj.getFullYear();
  const monthDifference = today.getMonth() - birthdateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdateObj.getDate())) {
    age--;
  }
  return age;
};

const CardPaciente = ({ paciente }) => {
  const { nome_completo, data_nascimento, telefone, convenio } = paciente;
  const idade = calculateAge(paciente.data_nascimento);

  return (
    <Styled.CardWrapper>
        <Styled.IconWrapper>
          <FaUser />
        </Styled.IconWrapper>
        <Styled.Name>{nome_completo}</Styled.Name>
        <Styled.Info>{idade} Anos</Styled.Info>
        <Styled.Info>{telefone}</Styled.Info>
        {convenio ? <Styled.Info style={{ color: COLOR.$message_success }}>{convenio}</Styled.Info> : <Styled.Info style={{ color: COLOR.$message_error }}>Sem Plano</Styled.Info> }
        <Link to={`/editapaciente/${paciente.id}`}>
          <Styled.ButtonVerMais>Ver mais</Styled.ButtonVerMais>
        </Link>

    </Styled.CardWrapper>
  );
};

CardPaciente.propTypes = {
  paciente: PropTypes.shape({
    nome_completo: PropTypes.string,
    idade: PropTypes.number,
    telefone: PropTypes.string,
    convenio: PropTypes.string,
  }).isRequired,
};

export default CardPaciente;