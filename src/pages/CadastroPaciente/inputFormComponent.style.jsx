import styled from "styled-components";
import PropTypes from "prop-types";
import TextMask from "react-text-mask";
import { COLOR } from "../../assets/styles/colors";

const sharedInputStyles = `
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  width: 100%;
`;

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
  color: ${({ $color }) =>
    $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Input = styled.input`
  ${sharedInputStyles}
  border: 1px solid ${({ $color }) =>
    $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
`;

export const Select = styled.select`
  ${sharedInputStyles}
  border: 1px solid ${({ $color }) =>
    $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
`;

export const ErrorMessage = styled.p`
  color: ${({ $color }) => $color || COLOR.$message_error};
`;

export const TextMaskInput = styled(TextMask)`
  ${sharedInputStyles}
  border: 1px solid ${({ $color }) =>
    $color === "danger" ? COLOR.$message_error : COLOR.$blue_darkest};
`;

Label.propTypes = { $color: PropTypes.string };
Input.propTypes = { $color: PropTypes.string };
Select.propTypes = { $color: PropTypes.string };
ErrorMessage.propTypes = { $color: PropTypes.string };
TextMaskInput.propTypes = { $color: PropTypes.string };
