import styled from 'styled-components';
import { Btn } from '../../Button/button.style';

export const FormLogin = styled.form`
    display: flex;
    width: 26.25rem;
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-shrink: 0;
    background: #fff;
    box-shadow: -15px 5px 10px 0px rgba(0, 74, 99, 0.25);
`
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1.2rem;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 1.2rem;
    padding: 1rem;
`
export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    
    img {
        width: 5rem;
        height: 5rem;
    }
`
export const CriarConta = styled.p`
    font-size: 1rem;
    color: #004a63;
    text-decoration: none;
`
export const BotaoBox = styled.div`
    display: flex;
    justify-content: center;
`

export const FormTitle = styled.legend`
    font-size: 2.5rem;
    font-weight: 700;
    color: #004a63;
`
export const Botao = styled(Btn)`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 3rem;
    font-size: 1rem;
    font-weight: 700;
`
export const EsqueceuSenha = styled.a`
    display: flex;
    align-self: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: #004a63;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`