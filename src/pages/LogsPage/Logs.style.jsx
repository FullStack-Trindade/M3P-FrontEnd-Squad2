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
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow: 0px 5px 5px 2px rgba(0,74,99,0.2);
`;

export const TitulosListaCardBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: .5rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h3 {
        font-size: 2rem;
    }
`;

export const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: .5rem;
    gap: .6rem;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    width: 100%;
`;

export const CardTitulo = styled.h3`
    font-size: 1.3rem;
    font-weight: 500;
`;