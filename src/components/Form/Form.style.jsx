import styled from 'styled-components';
import { Form } from 'react-bootstrap';


export const StyledForm = styled(Form)`
  display:flex;
  max-width: 1000px;
  height: 550px;
  margin: 30px 30px 20px 30px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.6s; 
 justify-content: center;
 
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 255, 0.4);
  }

  @media (max-width: 768px) {
    /* Estilos para pantallas más pequeñas */
    max-width: 100%;
    padding: 10px;
  }
`
export const Label = styled.label`

  margin-right: 6px;
  
`;

export const Input = styled.input`
  margin: 10px 10px;
  padding: 5px;
  width: 180px; 
  height: 40px;
  border-radius: 8px;
  border: 1px solid;
 
  `;

export const Select = styled.select`
  margin: 10px 10px;
  padding: 5px;
  width: 180px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid;
 
`;
export const GroupForm = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-content: stretch;
`
export const titulo = styled.h1`
width: 270px;
height: 10px;
margin-top: 20px;
`
export const ErrorMessage = styled.div`
  color: red;
  width: 200px;
  font-size: 10px;
`;

export const SuccessMessage = styled.div`
  color: green;

`;

