import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ConsultaService from "../../../services/CadastroConsulta/CadastroConsultaService";
import InputComponent from "../../Input/Input.component";
import { BtnCustom } from "../CadastroConsultaForm/CadastroConsultaStyled";
import { EqualDivider, Form, Child } from "../PacienteForm/PacienteForm.styled";
import ListaTodoPacientes from "../../ListaPacientes/ListaTodosPacientes";
import { Label } from "../DietaForm/DietaForm.styled";
import { SelectComponent } from "../../Select/SelectComponent";

function CadastroConsultaForm({ isEditing = false }) {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm();
  const [statusSistema, setStatus] = useState(true);
  const [paciente_id, setPacienteId] = useState(null);
  const [pacienteNome, setPacienteNome] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("@Auth:token");

  const [resultadosConsulta, setResultadosConsulta] = useState([]);
  const [loadingConsulta, setLoadingConsulta] = useState(false);

  const buscarEnConsultaServices = async (data) => {
    setLoadingConsulta(true);
    try {
      const pacientes = await ConsultaService.listarPacientes(data);
      const pacientesFiltrados = pacientes.filter(
        (paciente) =>
          paciente.nome_completo &&
          paciente.nome_completo
            .toLowerCase()
            .includes(data.search.toLowerCase())
      );
      setResultadosConsulta(pacientesFiltrados);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingConsulta(false);
    }
  };

  const handleSelectPaciente = (selectedPaciente) => {
    console.log(selectedPaciente.id);
    setPacienteId(selectedPaciente.id);
    setPacienteNome(`Paciente: ${selectedPaciente.nome_completo}`);
  };

  useEffect(() => {
    if (id) {
      // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do paciente
      const fetchConsultaDetails = async () => {
        try {
          const response = await ConsultaService.getConsultaPorId(id, token);
          if (response) {
            // Define os detalhes do paciente nos campos do formulário
            const consulta = response;
            Object.keys(consulta).forEach((key) => {
              setValue(key, consulta[key]);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes da consulta:", error);
        }
      };

      fetchConsultaDetails();
    } else {
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await ConsultaService.atualizarConsulta(id, data, token);
        toast.success(
          `Consulta do paciente ${data.nome_completo} atualizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );
      } else {
        //adiciona o status PADRÃO ao data
        setStatus(true);
        data = { ...data, paciente_id, statusSistema };
        console.log(data);

        // Caso contrário, estamos criando um novo paciente
        const response = await ConsultaService.criarConsulta(data, token);
        toast.success(
          `Cadastro da consulta do paciente: ${data.nome_completo} realizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );
        navigate("/editaconsulta/" + response.id);
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
        toast.error(`Erro ao cadastrar consulta do paciente ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      }
    }
  };

  const onDeleteConsulta = async () => {
    try {
      await ConsultaService.excluirConsulta(id, token);
      toast.success(`Exclusão da consulta realizada com sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
      navigate("/cadastroconsulta");
    } catch (error) {
      toast.error(`Erro ao excluir a consulta do paciente: ${error.message}`, {
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
      setValue("DataConsulta", getCurrentDate());
      setValue("horarioConsulta", getCurrentTime());
    }
  }, [isEditing, setValue]);

  return (
    <div style={{ width: "70%" }}>
      <EqualDivider>
        {!isEditing ? (
          <ListaTodoPacientes
            onSelectPaciente={handleSelectPaciente}
            resultados={resultadosConsulta}
            loading={loadingConsulta}
            onSearch={buscarEnConsultaServices}
          />
        ) : (
          <></>
        )}
      </EqualDivider>

      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EqualDivider>
            <Label $title>Consulta</Label>
          </EqualDivider>
          <EqualDivider>
            <Label>{pacienteNome}</Label>
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Motivo da consulta"
              id="motivoConsulta"
              register={{
                ...register("motivoConsulta", {
                  required: "Motivo da consulta é obrigatório",
                  minLength: { value: 8, message: "Mínimo de 8 caracteres" },
                  maxLength: { value: 64, message: "Máximo de 64 caracteres" },
                }),
              }}
              type="text"
              error={errors.motivoConsulta}
            />
            <InputComponent
              label="Data da Consulta"
              id="dataConsulta"
              register={{
                ...register("dataConsulta", {
                  required: "Data da Consulta é obrigatória",
                }),
              }}
              type="Date"
              error={errors.dataConsulta}
            />
            <InputComponent
              label="Horario da Consulta"
              id="horaConsulta"
              register={{
                ...register("horaConsulta", {
                  required: "Horário da Consulta é obrigatório",
                }),
              }}
              type="Time"
              error={errors.horaConsulta}
            />
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Descrição do problema"
              id="descricaoProblema"
              register={{
                ...register("descricaoProblema", {
                  required: "Descrição do problema é obrigatória",
                  minLength: { value: 16, message: "Mínimo de 16 caracteres" },
                  maxLength: {
                    value: 1024,
                    message: "Máximo de 1024 caracteres",
                  },
                }),
              }}
              type="textarea"
              rows={7}
              error={errors.descricaoProblema}
            />
          </EqualDivider>
          <EqualDivider>
          <InputComponent
              label="Medicação receitada"
              id="medicacao"
              register={{ ...register("medicacao") }}
              type="textarea"
              rows={5}
              error={errors.medicacao}

            />
          </EqualDivider>
          <EqualDivider>
          <InputComponent
              label="Dosagem e Precauções"
              id="dosagem"
              register={{
                ...register("dosagem", {
                  required: "Dosagem e Precauções são obrigatórias",
                  minLength: { value: 16, message: "Mínimo de 16 caracteres" },
                  maxLength: {
                    value: 256,
                    message: "Máximo de 256 caracteres",
                  },
                }),
              }}
              type="textarea"
              rows={5}
              error={errors.dosagem}
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
                  Editar Consulta
                </BtnCustom>
                <BtnCustom
                  variant="red"
                  type="button"
                  onClick={onDeleteConsulta}
                >
                  Excluir Consulta
                </BtnCustom>
              </>
            ) : (
              <BtnCustom variant="primary" type="submit">
                Enviar Consulta
              </BtnCustom>
            )}
          </EqualDivider>
        </Form>
      </div>
    </div>
  );
}
export default CadastroConsultaForm;

CadastroConsultaForm.propTypes = {
  isEditing: PropTypes.bool,
};
