import styled from "styled-components";
import PropTypes from "prop-types";
import  {COLOR}  from "../../../assets/styles/colors";

export const CardWrapper = styled.div`
  box-shadow: 2px 2px 10px ${COLOR['$white_dark']};
  margin: 5px;
  padding: 20px 10px;
  border-radius: 5px;
  border: none;
  transition: 0.3s linear all;
  background-color: ${(props) => props.color};
  color: ${COLOR['$white_lightest']};
  width: 100%;
  margin:10px;
  &:hover {
    color: ${COLOR['$white_lightest']};
    text-shadow:  ${COLOR['$white_darkest']};
    background-color:  ${COLOR['$blue_lightest']};
  }
`;

export const IconWrapper = styled.div`
  font-size: 5em;
  opacity: 0.2;
  color: ${COLOR['$white_lightest']};
`;

export const Title = styled.span`
  text-align: center;
  line-height: 0.9;
  font-style: italic;
  text-transform: capitalize;
  font-size: 1.5rem;
  padding-left: 15px;
  color: ${COLOR['$white_lightest']};
`;

export const Value = styled.span`
  text-align: center;
  font-size: 4rem;
  opacity: 0.9;
  font-weight: 700;
  color: ${COLOR['$white_lightest']};
`;

CardWrapper.propTypes = {
  color: PropTypes.string.isRequired,
};
