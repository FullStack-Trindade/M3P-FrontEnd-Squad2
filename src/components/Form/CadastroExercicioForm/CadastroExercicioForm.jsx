import {
  BtnCustom,
  Child,
  EqualDivider,
  Form,
  Label,
} from "../PacienteForm/PacienteForm.styled";
import InputComponent from "../../Input/Input.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import CadastroExercicioService from "../../../services/CadastroExercicio/CadastroExercicioService";
import ListaTodosPacientes from "../../ListaPacientes/ListaTodosPacientes";
import { SelectComponent } from "../../Select/SelectComponent";

export default function CadastroExercicioForm({ isEditing = false }) {
  const navigate = useNavigate();
  const [statusSistema, setStatus] = useState(true);
  const { id } = useParams();
  const [paciente_id, setPacienteId] = useState(null);
  const [pacienteNome, setPacienteNome] = useState("");
  const [resultadosExercicio, setResultadosExercicio] = useState([]);
  const [loadingExercicio, setLoadingExercicios] = useState(false);
  const token = localStorage.getItem("@Auth:token");
  const {
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
    register,
  } = useForm();

  const buscaEnExercicioServices = async (data) => {
    setLoadingExercicios(true);
    try {
      const pacientes = await CadastroExercicioService.listarPacientes(data);
      const pacientesFiltrados = pacientes.filter(
        (paciente) =>
          paciente.nome_completo &&
          paciente.nome_completo
            .toLowerCase()
            .includes(data.search.toLowerCase())
      );
      setResultadosExercicio(pacientesFiltrados);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingExercicios(false);
    }
  };
  const handleSelectPaciente = (selectedPaciente) => {
    console.log(selectedPaciente.id);
    setPacienteId(selectedPaciente.id);
    setPacienteNome(`Paciente: ${selectedPaciente.nome_completo}`);
  };

  useEffect(() => {
    if (id) {
      const fetchCadastroExercicioDetails = async () => {
        try {
          const response = await CadastroExercicioService.getExercicioPorId(
            id,
            token
          );
          if (response) {
            const exercicio = response;
            Object.keys(exercicio).forEach((key) => {
              setValue(key, exercicio[key]);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes dos exercicios:", error);
        }
      };

      fetchCadastroExercicioDetails();
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        // Atualizar exercício
        await CadastroExercicioService.updateExercicio(id, data, token);
        toast.success(
          `Exercício do paciente ${data.nome_completo} atualizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );
      } else {
        // Criar novo exercício
        setStatus(true);
        data = { ...data, paciente_id, statusSistema };

        const response = await CadastroExercicioService.criarExercicio(
          data,
          token
        );
        toast.success(
          `Exercício do paciente: ${data.nome_completo} criado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );

        navigate("/editaexercicio/" + response.id);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || "Erro desconhecido";
        toast.error(`Erro 409: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        toast.error(`Erro ao cadastrar exercício: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      }
    }
  };

  const onDeleteExercicio = async () => {
    try {
      if (id) {
        await CadastroExercicioService.excluirExercicio(id, token);
        toast.success(`Exercício excluído com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });

        navigate("/cadastroexercicio");
      }
    } catch (error) {
      toast.error(`Erro ao excluir o exercício: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
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
      setValue("DataExercicios", getCurrentDate());
      setValue("horarioExercicios", getCurrentTime());
    }
  }, [isEditing, setValue]);

  return (
    <div style={{ width: "70%" }}>
      <EqualDivider>
        {!isEditing ? (
          <ListaTodosPacientes
            onSelectPaciente={handleSelectPaciente}
            resultados={resultadosExercicio}
            loading={loadingExercicio}
            onSearch={buscaEnExercicioServices}
          />
        ) : (
          <></>
        )}
      </EqualDivider>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EqualDivider>
            <Label $title>Exercicios</Label>
          </EqualDivider>
          <EqualDivider>
            <Label>{pacienteNome}</Label>
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Nome de serie de exercicios"
              id="nomeSerie"
              register={{
                ...register("nomeSerie", {
                  required: "Nome do Serie de exercicios é obrigatorio",
                  minLength: { value: 5, message: "Minimo de 5 caracteres" },
                  maxLength: {
                    value: 100,
                    message: "Maximo de 100 caracteres",
                  },
                }),
              }}
              type="text"
              error={errors.nomeSerie}
            />

            <InputComponent
              label="Data"
              id="dataExercicio"
              register={{
                ...register("dataExercicio", {
                  required: "A data é obrigatoria",
                }),
              }}
              type="Date"
              error={errors.dataExercicio}
            />

            <InputComponent
              label="Horario do Exercicio"
              id="horaExercicio"
              register={{
                ...register("horaExercicio", {
                  required: " A hora é obrigatoria",
                }),
              }}
              type="Time"
              error={errors.horaExercicio}
            />
          </EqualDivider>
          <EqualDivider>
            <SelectComponent
              $width="20%"
              id="tipoExercicio"
              name="tipoExercicio"
              label="Tipo de exercicio"
              options={[
                {
                  id: 1,
                  value: "Tipo de exercicios",
                  label: "Tipo de exercicios",
                },
                {
                  id: 2,
                  value: "RESISTENCIA AEROBICA",
                  label: "RESISTENCIA AEROBICA",
                },
                {
                  id: 3,
                  value: "RESISTENCIA MUSCULAR",
                  label: "RESISTENCIA MUSCULAR",
                },
                { id: 4, value: "FORÇA", label: "FORÇA" },
                { id: 5, value: "AGILIDADE", label: "AGILIDADE" },
                { id: 6, value: "OUTRO", label: "OUTRO" },
              ]}
              register={{
                ...register("tipoExercicio", {
                  required: "o tipo de exercicio é pbrigatorio",
                }),
              }}
              error={errors.tipoExercicio}
            ></SelectComponent>
            <InputComponent
              label="Quantidade por semana"
              id="qtdPorsemana"
              type="number"
              step={0.01}
              register={{
                ...register("qtdPorSemana", {
                  required: "Quantidade por semana é obrigatorio",
                  pattern: {
                    value: /^[0-9]{2}\.[0-9]{2}$/,
                    message: "A quantidade deve estar no formato 00.00",
                  },
                }),
              }}
            />
            {errors.qtdPorsemana && <p>{errors.qtdPorsemana.message}</p>}
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Descrição"
              id="descricao"
              type="textarea"
              register={{
                ...register("descricao", {
                  required: "A descrição é obrigatória",
                  minLength: { value: 10, message: "minimo de 10 caracteres" },
                  maxLength: {
                    value: 1000,
                    message: "maximo de 1000 caracteres",
                  },
                }),
              }}
              rows="4"
              cols="50"
            />
          </EqualDivider>
          <EqualDivider>
            <SelectComponent
              $width={"20%"}
              id="statusSistema"
              name="statusSistema"
              label={"Status do Sistema"}
              options={[
                { id: 1, value: "true", label: "Ativo" },
                { id: 2, value: "false", label: "Inativo" },
              ]}
              register={{
                ...register("statusSistema", {
                  required: true,
                }),
              }}
              error={errors.statusSistema}
              disabled={!isEditing}
            ></SelectComponent>
            <Child></Child>
          </EqualDivider>
          <EqualDivider>
            {isEditing ? (
              <>
                <BtnCustom variant="blue" type="submit">
                  Editar Exercicio
                </BtnCustom>
                <BtnCustom
                  variant="red"
                  type="button"
                  onClick={onDeleteExercicio}
                >
                  Excluir Exercicio
                </BtnCustom>
              </>
            ) : (
              <BtnCustom variant="primary" type="submit">
                Enviar Exercicio
              </BtnCustom>
            )}
          </EqualDivider>
        </Form>
      </div>
    </div>
  );
}

CadastroExercicioForm.propTypes = {
  isEditing: PropTypes.bool,
};

