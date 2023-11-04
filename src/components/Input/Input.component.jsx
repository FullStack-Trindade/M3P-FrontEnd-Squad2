import { useState } from "react";
import PropTypes from "prop-types";
import ReactLoading from 'react-loading';

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import * as Styled from "./Input.style";
import { COLOR } from "../../assets/styles/colors";
export default function InputComponent ({
  label,
  type,
  id,
  placeholder,
  onBlur,
  isLoading,
  register,
  error,
  onChange,
  rows,
  value,
  defaultValue
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Styled.InputGroup>
      <Styled.Label $color={error && "danger"} htmlFor={id}>
        {label}
      </Styled.Label>
      {type !== "textarea" && (
        <Styled.InputContainer>
          <Styled.Input
            $color={error && "danger"}
            type={showPassword ? "text" : type}
            id={id}
            placeholder={placeholder}
            onBlur={onBlur}
            {...register}
            onChange={handleChange}
          />
          <Styled.Loading>
            {isLoading && (
              <ReactLoading
                type="spin"
                style={{color:COLOR.$blue_dark}}
                width={"2rem"}
              />
            )}
          </Styled.Loading>
          {type === "password" && (
            <Styled.Icon
              $color={error && "danger"}
              type="button"
              onClick={handleShowPassword}
            >
              {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </Styled.Icon>
          )}
          {error && <Styled.Error>{error.message}</Styled.Error>}
        </Styled.InputContainer>
      )}

      {type === "textarea" && (
        <Styled.TextAreaContainer>
          <Styled.TextArea
            $color={error && "danger"}
            id={id}
            placeholder={placeholder}
            rows={rows}
            onChange={handleChange}
            {...register}
          />
          {error && <Styled.Error>{error.message}</Styled.Error>}
        </Styled.TextAreaContainer>
      )}
    </Styled.InputGroup>
  );
};



InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.any,
  register: PropTypes.any,
  rows: PropTypes.any,
};
