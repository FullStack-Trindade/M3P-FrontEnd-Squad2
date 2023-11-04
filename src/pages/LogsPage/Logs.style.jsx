import styled from 'styled-components';

export const LogsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0,74,99,0.2);
`;

export const TitulosListaCardBox = styled.div`
    display: flex;
    margin-top: 2rem;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    h3 {
        font-size: 2rem;
    }
`;

export const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
`;

export const CardContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    width: 100%;
`;

export const CardTitulo = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
`;