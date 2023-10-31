import styled from 'styled-components';
import { Form } from 'react-bootstrap';


export const StyledForm = styled(Form)`
  display:flex;
  max-width: 910px;
  height: 450px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.6s; 
 justify-content: center;
 
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 255, 0.4);
  }
`
export const Label = styled.label`

  margin-right: 6px;
  
`;

export const Input = styled.input`
  margin: 5px 0;
  padding: 5px;
  width: 180px; 
  height: 40px;
  border-radius: 8px;
  border: 1px solid;
  gap: 10px;
  `;

export const Select = styled.select`
  margin: 5px 0;
  padding: 5px;
  width: 150px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid;
  gap: 10px;
`;
export const GroupForm = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-content: stretch;
`
export const titulo = styled.h1`
width: 200px;
height: 350px;
margin-top: 20px;
`

