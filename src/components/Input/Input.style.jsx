
import styled from "styled-components";
import PropTypes from "prop-types";
import { COLOR } from "../../assets/styles/colors";


export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;
export const Loading = styled.div`
    position: absolute;
    top: .9rem;
    right: .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ $color }) => {
      return $color === "danger" ? COLOR.$message_error: COLOR.$blue_darkest;
  }};
`;

export const Input = styled.input`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3126rem;
  margin-bottom:1rem;
  border: 1px solid;
  font-size: 1rem;
  color: ${({ $color }) => {
      return $color === "danger"  ? COLOR.$message_error : COLOR.$blue_darkest;
    }};
  width: 100%;
  &::placeholder {
    ont-size: 1rem;
    color: ${({ $color }) => {
      return $color === "danger"  ? COLOR.$message_error : COLOR.$blue_darkest;
    }}}
`;

export const TextArea = styled.textarea`
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  width: 100%;
  border: 1px solid;
  width: 100%;
  color: ${({ $color }) => {
      return $color === "danger"  ? COLOR.$message_error : COLOR.$blue_darkest;
    }};
`;
export const Select = styled.select`
  display: flex;
  padding: 0.5rem;
  margin-top: .390rem;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  border: 1px solid;
  color: ${({ $color }) => {
      return $color === "danger"  ? COLOR.$message_error : COLOR.$blue_darkest;
    }};
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const Error = styled.p`
    font-size: .8rem;
    color: COLOR.$message_error;
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
    return $color === "danger"  ? COLOR.$message_error : COLOR.$blue_darkest;
  }};
`;

Icon.propTypes = { $color: PropTypes.string };
Label.propTypes = { $color: PropTypes.string };
Input.propTypes = { $color: PropTypes.string };
TextArea.propTypes = { $color: PropTypes.string };
