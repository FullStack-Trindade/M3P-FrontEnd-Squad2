import styled from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    min-height: 100vh;
    overflow: auto;
`;

export const LayoutMain = styled.main`
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
`;

export const LayoutContent = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: #fff;
    color: #666;
    flex: 1;
    width: 100%;
    
`;