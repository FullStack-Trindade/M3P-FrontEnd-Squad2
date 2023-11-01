import * as Styled from "../Input/Input.style";

function OptionComponent({ register, value, value1, value2, value3, id,error,label }) {
 
    return (
    <>
    <div>
    <Styled.Label $color={error && "danger"} htmlFor={id}>
        {label}
      </Styled.Label>
      <Styled.Select id="valores" $color={error && "danger"}   {...register}>
        <option></option>
        <option id={id} value={value}>{value}</option>
        <option id={id} value={value1}>{value1}</option>
        <option id={id} value={value2}>{value2}</option>
        <option id={id} value={value3}>{value3}</option>
      </Styled.Select >
      {error && <Styled.Error>{error.message}</Styled.Error>}
      </div>
    </>
  );
}

export default OptionComponent;

/* <OptionComponent
           id="Genero"
           label="Genero"
           value="Cisgenero"
           value1="Transgenero"
           value2="Prefiro não declarar"
           register={register("Genero", { required: "Campo obrigatorio" })}
          error={errors.Genero}
        /> */