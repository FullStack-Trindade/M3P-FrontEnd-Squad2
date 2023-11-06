import React from 'react';
import PropTypes from 'prop-types';

import {FaUser} from 'react-icons/fa';

import * as Styled from '../CardPaciente/CardPaciente.style';
import { Link } from 'react-router-dom';


const CardUsuario = ({ user }) => {
  const { nomeCompleto, tipo, telefone, email } = user;

  return (
    <Styled.CardWrapper>
        <Styled.IconWrapper>  

      <FaUser/>
      
        </Styled.IconWrapper>
        <Styled.Name>{nomeCompleto}</Styled.Name>
        <Styled.Info>{tipo}</Styled.Info>
        <Styled.Info>{telefone}</Styled.Info>
        <Styled.Info>{email}</Styled.Info>
        <Link to={`/editausuario/${user.usuarioId}`}>
          <Styled.ButtonVerMais>Ver mais</Styled.ButtonVerMais>
        </Link>

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