import styled from "styled-components";
import PropTypes from "prop-types";
import { COLOR } from "../../assets/styles/colors";
import InputMask from 'react-input-mask';

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  color: ${({ $color }) => {
    return $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest;
  }};

  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Input = styled(InputMask)`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;

  border: 1px solid
    ${({ $color }) => {
      return $color === "danger"
        ? COLOR.$message_error
        : COLOR.$blue_darkest;
    }};

  width: 100%;
`;

export const TextArea = styled.textarea`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  border: 1px solid
    ${({ $color }) => {
      return $color === "danger"
        ? COLOR.$message_error
        : COLOR.$blue_darkest;
    }};
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Icon = styled.button`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;

  cursor: pointer;

  background: transparent;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ $color }) => {
    return $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest;
  }};
`;

Icon.propTypes = { $color: PropTypes.string };
Label.propTypes = { $color: PropTypes.string };
Input.propTypes = { $color: PropTypes.string };
TextArea.propTypes = { $color: PropTypes.string };
