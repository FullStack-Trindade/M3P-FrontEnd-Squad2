
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLOR } from "../../assets/styles/colors";

export const Icon = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.3rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: COLOR.$blue_darkest;
  font-size: 18px;
 
`;

export const Input = styled.input`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3126rem;
  margin-bottom:1rem;
  border: 1px solid;
  color: COLOR.$blue_darkest;
  width: 80%;
  &::placeholder {
    color: COLOR.$blue_darkest;
    }
`;
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

Icon.propTypes = { $color: PropTypes.string };
Input.propTypes = { $color: PropTypes.string };
InputContainer.propTypes = { $color: PropTypes.string };