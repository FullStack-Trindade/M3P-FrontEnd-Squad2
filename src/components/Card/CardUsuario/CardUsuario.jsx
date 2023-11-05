import React from 'react';
import PropTypes from 'prop-types';

import {FaUserNurse} from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";

import * as Styled from '../CardPaciente/CardPaciente.style';
import  {COLOR}  from "../../../assets/styles/colors";
import { useAuth } from '../../../hooks/useAuth';

const CardUsuario = ({ user }) => {
  const { nomeCompleto, tipo, telefone, email } = user;
  const { usuario } = useAuth();

  return (
    <Styled.CardWrapper>
        <Styled.IconWrapper>  
       { usuario?.tipo === "ADMINISTRADOR"
      ? <RiAdminFill/>
      :  <FaUserNurse style={{color:COLOR.$blue_light}}/>}
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