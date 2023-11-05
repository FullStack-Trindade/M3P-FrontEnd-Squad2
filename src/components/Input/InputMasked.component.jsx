
import InputMask from "react-input-mask";
import InputComponent from "./Input.component";


export default function InputMasked({ name, mask, maskChar, error, ...inputprops}) {
 
  return (    

        <InputMask
          name={name}
          mask={mask}   
          maskChar= {maskChar}
          error={error}
          {...inputprops}
        >
          {(inputprops) => (
            <InputComponent
              {...inputprops}                 
            
            />            
          )}
        </InputMask>
      
  );
}


/* <InputMasked
          name="cpf"
          mask={"999.999.999-99"}
          maskChar={null}
          error={errors.cpf}
          label="CPF"
          id="cpf"
          type="text"
          placeholder="123.123.123-12"
          register={register("cpf",{ required: "Este campo é obrigatório"})}
        /> */