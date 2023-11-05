import styled from "styled-components";
import PropTypes from 'prop-types';

export const StyledForm = styled.form`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
`

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: ${props => props.$tittle ? '600' : '500'};
  font-size: ${props => props.$tittle ? '22px' : '20px'};
  color: ${props => props.$tittle ? '#288c9d' : '#145979'};
  cursor: ${props => props.$bt ? 'pointer' : ''};
`


export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border: 1px solid #004A63;
`


export const StyledButton = styled.button`
  background-color: #c6c6c6; 
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    outline: 3px solid #0e7ee13b;
  }
`

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f4433686;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`

export const EqualDivider = styled.div`
  /* Desktop styles */
  display: flex;
  padding: 0.5rem;
  margin: 0.5rem;

  /* Mobile styles */
  @media (max-width: 1024px) {
    display: block;
    ${({ $vertical }) => $vertical && 'margin-top: 1rem margin-left:1rem'}
  }

  ${props => props.$vertical && "flex-direction: column;"}

  > * {
    flex: 1;
  }
`;

export const Child = styled.div`

padding: 0.25rem 0.5rem;
`;


EqualDivider.propTypes = {$vertical: PropTypes.bool}
StyledLabel.propTypes = {$tittle: PropTypes.bool }
StyledLabel.propTypes = {$bt: PropTypes.bool }


