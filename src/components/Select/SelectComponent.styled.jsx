import styled from 'styled-components';
import { COLOR } from '../../assets/styles/colors';

export const SelectContainer = styled.div`
  margin-top: 6px;
  width: ${({ $width }) => ($width ? $width : '100%')};

`


export const Label = styled.label`
display: flex;
align-items: flex-start;
gap: 0.625rem;
align-self: stretch;
color: ${({ $color }) =>
  $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
font-size: 1.25rem;
font-style: normal;
font-weight: 400;
line-height: normal;

`;


export const Select = styled.select`
display: flex;
padding: 0.5rem;
align-items: flex-start;
align-self: stretch;
border-radius: 0.3125rem;
width: 100%;

  border: 1px solid ${({ $color }) =>
    $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
  
`;

