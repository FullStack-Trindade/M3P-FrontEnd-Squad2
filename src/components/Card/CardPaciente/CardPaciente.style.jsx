import styled from 'styled-components';
import  {COLOR}  from "../../../assets/styles/colors";

export const CardWrapper = styled.div`
  margin-top: 2rem;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 8px ${COLOR['$black_dark']};
  text-align: center;
  background-color: ${COLOR['$white_light']};
  padding:20px;
  &:hover {
    color: ${COLOR['$white_lightest']};
    text-shadow:  ${COLOR['$white_darkest']};
    background-color:  ${COLOR['$white_medium']};
  }
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: ${COLOR['$black_lightest']};
  margin-bottom: 1rem;
`;

export const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${COLOR['$blue_medium']};
`;

export const Info = styled.p`
  font-size: 1.1rem;
  color: ${COLOR['$black_medium']};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const ButtonVerMais = styled.button`
  background-color: ${COLOR['$blue_lightest']};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: ${COLOR['$white_medium']};
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${COLOR['$white_lightest']};
  }
`;