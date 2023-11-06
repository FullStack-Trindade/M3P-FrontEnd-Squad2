
import styled  from 'styled-components';
import { Form } from 'react-bootstrap';

export const PatientList = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 20px;
`;

export const SearchInput = styled(Form.Control)`
  border: 3px solid #ccc; 
  font-size: 1.2rem; 
  color: #555; 
`;

export const IconWrapper = styled.div`
  font-size: 2rem;
  color: #549ABB;
  margin-bottom: 1rem;
`;

export const PatientRow = styled.tr`
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); /* Ajuste aqui para diminuir o sombreamento */
`;

export const StyledLabel = styled.label`
  display: block;
  margin-left: 40px;
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 28px;
  color: #145979;
`

export const StyledTittle = styled.label`
  font-weight: 700;
  font-size: 22px;
  color: #5f5f5f;
`

export const StyledData = styled.label`
  font-weight: 500;
  font-size: 18px;
  color: #549ABB;
`