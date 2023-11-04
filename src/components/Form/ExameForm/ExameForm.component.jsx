import InputComponent from "../../Input/Input.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as Styled from "../../Button/button.style";
import "./ExameForm.css";
import ExameService from "../../../services/Exame/ExameService";

export default function ExameForm() {
  const [exame, setExame] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
    async () => {
      await service.Get(id).then((response) => {
        setExame(response);
        Object.entries(response).map(([key, value]) => {
          setValue(key, value);
        });
      });
    };
  }, [setValue]);

  const service = new ExameService();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isValid) {
      alert("Erro, tente novamente");
    } else {
      let token = localStorage.getItem("@Auth:token");
      await service
        .Create(data, token)
        .then((response) =>
          alert(`Exame ${response.nomeExame} criado com sucesso.`)
        );
      reset();
    }
  };

  /*  const save = async (data,token) => {
  
  };

  const editar = async (data) => {
    const body = {
      ...exame,
      ...data,
    };
    await service
      .Update(exame.id, data)
      .then((response) =>
        alert(`Exame ${response.nomeExame} atualizado com sucesso.`)
      );
    reset();
  };

  const deletar = async () => {
    await service.Delete(exame.id);
  };
 */

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          label="Nome do Exame:"
          type="text"
          id="nomeExame"
          placeholder="Ultrassonografia"
          register={register("nomeExame", {
            required: "Este campo é obrigatorio",
          })}
          error={errors.nomeExame}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "10px",
          }}
        >
          <InputComponent
            label="Data do Exame:"
            type="date"
            id="dataExame"
            placeholder=""
            register={register("dataExame", {
              required: "Este campo é obrigatorio",
            })}
            error={errors.dataExame}
          />

          <InputComponent
            step="1"
            label="Horario do Exame:"
            id="horaExame"
            type="time"
            register={register("horaExame", {
              required: "Este campo é obrigatório",
            })}
            error={errors.horaExame}
          />
        </div>
         <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "10px",
          }}>
          <InputComponent
            label="Tipo do Exame:"
            type="text"
            id="tipoExame"
            register={register("tipoExame", {
              required: "Este campo é obrigatorio",
            })}
            error={errors.tipoExame}
          />
          <InputComponent
            label="Laboratório:"
            type="text"
            id="laboratorio"
            register={register("laboratorio", {
              required: "Este campo é obrigatorio",
            })}
            error={errors.laboratorio}
          />

          <InputComponent
            label="URL para documento:"
            type="text"
            id="docurl"
            register={register("docurl")}
          />
        </div>

        <InputComponent
          label="Resultados:"
          type="textarea"
          rows={4}
          id="resultados"
          register={register("resultados", {
            required: "Este campo é obrigatorio",
          })}
          error={errors.resultados}
        />

        {/*  <InputComponent
          label="Paciente Id:"
          type="text"
          id="paciente_id"
          register={register("paciente_id", {
            required: "Este campo é obrigatorio",
          })}
          error={errors.PacienteId}
        />

        <InputComponent
          className="col-3"
          label="Status do Sistema:"
          type="boolean"
          id="statusSistema"
          register={register("statusSistema", {
            required: "Este campo é obrigatorio",
          })}
          error={errors.statusSistema}
        />
 */}
<div style={{margin:"20px"}}>       <Styled.Btn variant="primary" type="submit">
          Salvar Exame
        </Styled.Btn>
       
        {/*  <Styled.Btn variant="blue" type="button" onClick={editar}>
          Editar Exame
        </Styled.Btn>

        <Styled.Btn variant="red" type="button" onClick={deletar}>
          Excluir Exame
        </Styled.Btn> */}
         </div> 
      </form>
    </>
  );
}
