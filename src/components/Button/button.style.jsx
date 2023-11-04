import styled, { css } from "styled-components";

const variantStyles = (variant = 'primary') => ({
    primary: css`
        background-color: #004A63;
        color: #fff;
    `,
    outlined: css`
        background-color: #fff;
        border: 2px solid #004A63;
        color: #004A63;

        &:hover {
            color: #fff;
            background-color: #004A63;
        }
    `,
    info: css`
        background-color: #BCCCE0;
        outline: 0;
        border-color: #BCCCE0;
    `,
    red: css`
        background-color: #b02a37;
        color: #fff;
    `,
    redOutlined: css`
        background-color: #fff;
        border: 2px solid #b02a37;
        color: #b02a37;

        &:hover {
            color: #fff;
            background-color: #b02a37;
        }
    `,
    green: css`
        background-color: #198754;
        color: #fff;
    `,
    greenOutlined: css`
        background-color: #fff;
        border: 2px solid #198754;
        color: #198754;

        &:hover {
            color: #fff;
            background-color: #198754;
        }
    `,
    blue: css`
        background-color: #0d6efd;
        color: #fff;
    `,
    blueOutlined: css`
        background-color: #fff;
        border: 2px solid #0d6efd;
        color: #0d6efd;

        &:hover {
            background-color: #0d6efd;
            color: #fff;
        }
    `
}[variant])

export const Btn = styled.button`
    padding: 5px 1rem;
    border-radius: .5rem;
    font-size: .95rem;
    transition: all .2s ease-in-out;
    border: 2px solid transparent;
    outline: 0;
    /* Para utilizar props variáveis */
    /* background-color: ${props => props.color === 'green' ? '#A7CAB1' : '#0D6C86'}; */
    
    /* Utiliza as variantes do botão */
    ${({variant}) => variantStyles(variant)}

    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 5px #888888;
    }

    &:disabled {
        pointer-events: none;
        opacity: .5;
    }
` 