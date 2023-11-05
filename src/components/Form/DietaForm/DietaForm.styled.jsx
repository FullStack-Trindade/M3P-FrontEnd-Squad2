import styled from "styled-components";
import { COLOR } from "../../../assets/styles/colors";
import { Btn } from "../../Button/button.style";
import PropTypes from 'prop-types';

export const Form = styled.form`
  width: 100%;
  background-color: ${COLOR.$white_lightest};
  padding: 20px;
  border-radius: 5px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: ${props => props.$tittle ? '600' : '500'};
  font-size: ${props => props.$tittle ? '22px' : '18px'};
  color: ${props => props.$tittle ? '#145979' : '#288c9d'};
`

export const BtnCustom = styled(Btn)`
  max-width: 250px;
  padding: 10px;
  margin-top: 10px;
  margin-left: 15px;

`

export const Alert = styled.div`
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
BtnCustom.propTypes = {$delete: PropTypes.bool, $disabled: PropTypes.bool }
Label.propTypes = {$tittle: PropTypes.bool }
