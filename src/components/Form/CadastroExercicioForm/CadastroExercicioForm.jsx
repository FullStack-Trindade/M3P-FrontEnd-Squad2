import { BtnCustom, EqualDivider, Form } from "../PacienteForm/PacienteForm.styled";
import InputComponent from "../../Input/Input.component";
import { useForm } from "react-hook-form";
import { SelectCostum} from "./CadastroExercicioForm.Style";
import { TextArea } from "../../Input/Input.style";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CadastroExercicioService from "../../../services/CadastroExercicio/CadastroExercicioService";

export default function CadastroExercicioForm({ isEditing = false }) {
    const [exercicioId, setExercicioId] = useState(null);
    const { id } = useParams();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODg4MjM2MywiZXhwIjoxNjk4OTY4NzYzfQ.AKLEbojUaY0Drp288h0rPud0pe01SB9ZREcUu8_a1_w";
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm();


  useEffect(() => {
    if (id) {
      // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do paciente
      const fetchCadastroExercicioDetails = async () => {
        try {
          const response = await CadastroExercicioService.getExercicioPorId(id, token);
          if (response) {
            // Define os detalhes do paciente nos campos do formulário
            const exercicio = response;
            Object.keys(exercicio).forEach((key) => {
              setValue(key, exercicio[key]);
            });
          }
        } catch (error) {
          console.error('Erro ao buscar detalhes dos exercicios:', error);
        }
      };

      fetchCadastroExercicioDetails();
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        // Atualizar exercício
        await CadastroExercicioService.updateExercicio(exercicioId, data);
        toast.success(
          `Exercício atualizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 2000,
          }
        );
      } else {
        // Criar novo exercício
        const response = await CadastroExercicioService.createExercicio(data);
        toast.success(
          `Exercício criado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 2000,
          }
        );
        // Lidar com sucesso na criação e redirecionamento
        setExercicioId(response.id); // Configura o ID do exercício criado para posterior edição
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || 'Erro desconhecido';
        toast.error(`Erro 409: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      } else {
        toast.error(`Erro ao cadastrar exercício: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      }
    }
  };

  const onDeleteExercicio = async () => {
    try {
      if (exercicioId) {
        await CadastroExercicioService.deleteExercicio(exercicioId);
        toast.success(`Exercício excluído com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
        // Lidar com sucesso na exclusão
        setExercicioId(null); // Limpa o ID após exclusão
      }
    } catch (error) {
      toast.error(`Erro ao excluir o exercício: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        autoClose: 2000,
      });
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    if (!isEditing) {
      setValue("DataConsulta", getCurrentDate());
      setValue("horarioConsulta", getCurrentTime());
    }
  }, [isEditing, setValue]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EqualDivider>
          <InputComponent
            label="Nome de serie de execicios"
            name="nomeDeSerie"
            control={control}
            type="text"
            rules={{
              required: "Nome do Serie de exercicios é obrigatorio",
              minLength: { value: 5, message: "Minimo de 5 caracteres" },
              maxLength: { value: 100, message: "Maximo de 100 caracteres" },
            }}
          />

          <InputComponent
            label="Data"
            name="data"
            control={control}
            type="Date"
            rules={{
              required: "Data é obrigatorio",
            }}
          />

          <InputComponent
            label="Horario da Consulta"
            name="horarioConsulta"
            control={control}
            type="Time"
            rules={{ required: "Horário da Consulta é obrigatório" }}
          />
        </EqualDivider>
        <EqualDivider>
          <SelectCostum name="tipo" id="tipo-select">
            <option value=""> Seleciona o tipo de exercicio</option>
            <option value="resistencia aerobica">Resistência Aeróbica</option>
            <option value="resistencia muscular">Resistência Muscular</option>
            <option value="flexibilidade">Flexibilidade</option>
            <option value="força">Força</option>
            <option value="agilidade">Agilidade</option>
            <option value="outro">Outro</option>
          </SelectCostum>

          <InputComponent
            label="Quantidade por semana"
            name="qtdporsemana"
            type="number"
            step="0.03"
            rules={{
              required: "Quantidade por semana é obrigatorio",
              validate: (value) => {
                if (isNaN(value)) return "Digite um número válido";
                if (value % 0.01 !== 0) return "Mínimo de duas casas decimais";
                return true;
              },
            }}
          />
          {errors.qtdporsemana && <p>{errors.qtdporsemana.message}</p>}
        </EqualDivider>
        <EqualDivider>
          <TextArea
            label="Descrição"
            name="descricao"
            type="text"
            placeholder="Descrição"
            control={control}
            minLength="10"
            maxLength="1000"
            rows="4"
            cols="50"
          />
        </EqualDivider>
        <EqualDivider>
          {isEditing ? (
            <>
              <BtnCustom variant="blue" type="submit" >
                Editar Consulta
              </BtnCustom>
              <BtnCustom variant="red" type="button" onClick={onDeleteExercicio}>
                Excluir Consulta
              </BtnCustom>
            </>
          ) : (
            <BtnCustom variant="primary" type="submit" >
              Enviar Consulta
            </BtnCustom>
          )}
        </EqualDivider>
      </Form>
    </>
  );
}

CadastroExercicioForm.propTypes = {
    isEditing: PropTypes.bool,
  };
