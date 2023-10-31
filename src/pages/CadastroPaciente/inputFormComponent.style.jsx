import styled from "styled-components";
import PropTypes from "prop-types";
import TextMask from "react-text-mask";
import { COLOR } from "../../assets/styles/colors";

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
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

export const Input = styled.input`
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

export const Select = styled.select`
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

export const TextMaskInput = styled(TextMask)`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  border: 1px solid ${({ $color }) => ($color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest)};
  width: 100%;
`;


  Label.propTypes = { $color: PropTypes.string };
  Input.propTypes = { $color: PropTypes.string };
  Select.propTypes = { $color: PropTypes.string };
  TextMaskInput.propTypes = { $color: PropTypes.string };