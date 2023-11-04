import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import ExameService from "../../../services/Exame/ExameService";
import InputComponent from "../../Input/Input.component";
import OptionComponent from "../../Option/OptionComponent";

import * as Styled from "../../Button/button.style";

const token = localStorage.getItem("@Auth:token");
export default function ExameForm({ isEditing = false }) {
  const { id } = useParams();
  const service = new ExameService();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);

  
  useEffect(() => {
    if (id) {
      const exameData = async () => {
        try {
          const response = await service.GetById(parseInt(id));
          if (response) {
            const exame = response;
            Object.keys(exame).forEach((key) => {
              setValue(key, exame[key]);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes do exame:", error);
        }
      };

      exameData();
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await service.Update(id, data, token);
        toast.success(`Exame ${data.nomeExame} atualizado com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        console.log(data)
        setStatus(true);
        data = { ...data, status };
        const response = await service.Create(data, token);
        toast.success(
          `Cadastro do exame: ${response.exame} realizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );
        navigate("/editaexame/" + response.id);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || "Erro desconhecido";
        toast.error(`Erro 400: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        toast.error(`Erro ao cadastrar exame: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      }
    }
  };

  const deletar = async () => {
    try {
      await service.Delete(id, token);
      toast.success(`Exclusão do exame realizada com sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
      navigate("/cadastraexame");
    } catch (error) {
      toast.error(`Erro ao excluir exame: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <form  style={{width:"98%"}} noValidate onSubmit={handleSubmit(onSubmit)}>
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
          }}
        >
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
      
        <OptionComponent
          label="Status do Sistema:"
          id="statusSistema"
          value="true"
          value1="false"
          register={register("statusSistema", { required: "Campo obrigatorio" })}
          error={errors.status}
        />

        <div style={{ margin: "20px" }}>
          {isEditing ? (
            <>
              <Styled.Btn variant="blue" type="button" onClick={editar}>
                Editar Exame
              </Styled.Btn>
              <Styled.Btn variant="red" type="button" onClick={deletar}>
                Excluir Exame
              </Styled.Btn>
            </>
          ) : (
            <Styled.Btn variant="primary" type="submit">
              Salvar Exame
            </Styled.Btn>
          )}
        </div>
      </form>
    </>
  );
}

ExameForm.propTypes = {
  isEditing: PropTypes.bool,
};