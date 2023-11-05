import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';

import {FaUser} from 'react-icons/fa';

import * as Styled from '../CardPaciente/CardPaciente.style';


const CardUsuario = ({ user }) => {
  const { nomeCompleto, tipo, telefone, email } = user;
  const { usuario } = useAuth();

  return (
    <Styled.CardWrapper>
        <Styled.IconWrapper>  

      <FaUser/>
      
        </Styled.IconWrapper>
        <Styled.Name>{nomeCompleto}</Styled.Name>
        <Styled.Info>{tipo}</Styled.Info>
        <Styled.Info>{telefone}</Styled.Info>
        <Styled.Info>{email}</Styled.Info>
    </Styled.CardWrapper>
  );
};

CardUsuario.propTypes = {
  user: PropTypes.shape({
    nomeCompleto: PropTypes.string,
    tipo: PropTypes.string,
    telefone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default CardUsuario;