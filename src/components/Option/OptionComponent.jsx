import PropTypes from "prop-types";
import * as Styled from "../Input/Input.style";

export default function OptionComponent({ register, value, value1, value2, value3, id,error,label }) {
 
    return (
    <>
    <div>
    <Styled.Label $color={error && "danger"} htmlFor={id}>
        {label}
      </Styled.Label>
      <Styled.Select id={id} $color={error && "danger"}   {...register}>
        <option></option>
        <option  value={value}>{value}</option>
        <option  value={value1}>{value1}</option>
        <option  value={value2}>{value2}</option>
        <option  value={value3}>{value3}</option>
      </Styled.Select >
      {error && <Styled.Error>{error.message}</Styled.Error>}
      </div>
    </>
  );
}

OptionComponent.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  value3: PropTypes.string,
  error: PropTypes.any,
  register: PropTypes.any,
  rows: PropTypes.any,
};



/* <OptionComponent
           id="Genero"
           label="Genero"
           value="Cisgenero"
           value1="Transgenero"
           value2="Prefiro não declarar"
           register={register("Genero", { required: "Campo obrigatorio" })}
          error={errors.Genero}
        /> */