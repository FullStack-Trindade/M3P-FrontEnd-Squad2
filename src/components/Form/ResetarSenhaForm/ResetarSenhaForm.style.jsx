import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormLogin, Header, FormTitle, Main, Footer, Botao } from "../LoginForm/LoginForm.style";

export const ResetarSenhaForm = styled(FormLogin)``

export const ResetarSenhaHeader = styled(Header)``

export const ResetarSenhaFormTitle = styled(FormTitle)``

export const ResetarSenhaMain = styled(Main)``

export const ResetarSenhaFooter = styled(Footer)``

export const ResetarSenhaBotao = styled(Botao)``

export const VoltarLogin = styled(Link)`
    display: flex;
    align-self: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: #004a63;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
