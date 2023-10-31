import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import * as Styled from "./Input.style";
import { COLOR } from "../../assets/styles.colors";
import PropTypes from "prop-types";
import InputMask from "react-input-mask"

const InputComponent = ({
  label,
  type,
  id,
  placeholder,
  onBlur,
  isLoading,
  register,
  error,
  value,
  rows,
  defaultValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
            value={value || defaultValue}
          />
          <Styled.Loading>
            {isLoading && (
              <ReactLoading
                type="spin"
                style={{ color: COLOR.$blue_dark }}
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
            value={value || defaultValue}
            {...register}
          />
          {error && <Styled.Error>{error.message}</Styled.Error>}
        </Styled.TextAreaContainer>
      )}
    </Styled.InputGroup>
  );
};

export default InputComponent;

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.any,
  register: PropTypes.any,
  mask: PropTypes.any,
};


/*     
;  

<InputMask
          name="cpf"
          mask={"999.999.999-99"}      
          maskChar=""
        >
          {(inputprops) => (
            <InputComponent
              {...inputprops}
              label="CPF"
              id="cpf"
              type="text"
              placeholder="123.123.123-12"
              register={register("cpf")}          
            
            />            
          )}
        </InputMask> */