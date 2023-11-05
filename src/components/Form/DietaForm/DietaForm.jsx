import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DietaService from "../../../services/Dieta/DietaService";
import PropTypes from "prop-types";
import InputComponent from "../../InputForm/inputFormComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListaTodosPacientes from "../../ListaPacientes/ListaTodosPacientes";

import {
  Form,
  Label,
  EqualDivider,
  Child,
  BtnCustom as Btn,
} from "./DietaForm.styled";

//token consumindo do local storage
const token = localStorage.getItem("@Auth:token");

const DietaForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const { handleSubmit, control, setValue, reset } = useForm();
  const [status_sistema, setStatus] = useState(true);
  const [paciente_id, setPacienteId] = useState(null);
  const [pacienteNome, setPacienteNome] = useState("");
  const navigate = useNavigate();

  // //setar data e hora atual
  // const [dataAtual, setDataAtual] = useState(new Date().toISOString().split('T')[0]);
  // const [horarioAtual, setHorarioAtual] = useState(new Date().toLocaleTimeString( { hour: '2-digit', minute: '2-digit' }));

  // const paciente_id = 1;

  const handleSelectPaciente = (selectedPaciente) => {
    console.log(selectedPaciente.id);
    setPacienteId(selectedPaciente.id);
    setPacienteNome(`Paciente: ${selectedPaciente.nome_completo}`);
  };

  // Define o estado de edição com base no ID da rota
  useEffect(() => {
    if (id) {
      // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do dieta
      const fetchDietaDetails = async () => {
        try {
          const response = await DietaService.getDietaPorId(id, token);
          if (response) {
            // Define os detalhes do dieta nos campos do formulário
            const dieta = response;
            Object.keys(dieta).forEach((key) => {
              setValue(key, dieta[key]);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes do dieta:", error);
        }
      };

      fetchDietaDetails();
    } else {
      const initialData = {
        nome_dieta: "",
        tipo: "",
        descricao: "",
        data: "",
        horario: "",
      };
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      //lista dados do dieta a serem enviados
      console.log(data);

      if (id) {
        await DietaService.atualizarDieta(id, data, token);
        toast.success(`Dieta ${data.nome_completo} atualizado com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        //adiciona o status PADRÃO ao data
        setStatus(true);
        console.log(paciente_id);
        data = { ...data, status_sistema, paciente_id };
        // Caso contrário, estamos criando um novo dieta
        const response = await DietaService.criarDieta(data, token);
        toast.success(
          `Cadastro do dieta: ${response.nome_completo} realizado com sucesso!`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
            autoClose: 2000,
          }
        );
        navigate("/editadieta/" + response.id);
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
        toast.error(`Erro ao cadastrar dieta: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          autoClose: 2000,
        });
      }
    }
  };

  const onDeleteDieta = async () => {
    try {
      await DietaService.excluirDieta(id, token);
      toast.success(`Exclusão do dieta realizada com sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
      navigate("/cadastradieta");
    } catch (error) {
      toast.error(`Erro ao excluir dieta: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <EqualDivider>
        {!isEditing ? (
          <ListaTodosPacientes onSelectPaciente={handleSelectPaciente} />
        ) : (
          <></>
        )}
      </EqualDivider>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EqualDivider>
            <Label $tittle>DIETA</Label>
          </EqualDivider>
          <EqualDivider>
            <Label>{pacienteNome}</Label>
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Nome da Dieta"
              name="nome_dieta"
              control={control}
              type="text"
              placeholder="Informe o nome completo"
              rules={{
                required: "Campo obrigatório",
                minLength: {
                  value: 5,
                  message: "Nome deve ter pelo menos 5 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "Nome deve ter no máximo 100 caracteres",
                },
              }}
            />
            <InputComponent
              label="Tipo"
              name="tipo"
              control={control}
              type="select"
              options={[
                { label: "Selecione o tipo", value: "" },
                { label: "Low Carb", value: "Low Carb" },
                { label: "Dash", value: "Dash" },
                { label: "Paleolítica", value: "Paleolítica" },
                { label: "Cetogênica", value: "Cetogênica" },
                { label: "Dukan", value: "Dukan" },
                { label: "Mediterrânea", value: "Mediterrânea" },
                { label: "Outra", value: "Outra" },
              ]}
              rules={{ required: "Campo obrigatório" }}
            />
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Descrição"
              name="descricao"
              control={control}
              type="text"
              placeholder="Informe o nome completo"
              rules={{
                required: "Campo obrigatório",
                minLength: {
                  value: 10,
                  message: "Descrição deve ter pelo menos 10 caracteres",
                },
                maxLength: {
                  value: 1000,
                  message: "Descrição deve ter no máximo 1000 caracteres",
                },
              }}
            />
          </EqualDivider>
          <EqualDivider>
            <InputComponent
              label="Data"
              name="data"
              control={control}
              type="date"
              // value={dataAtual}
              rules={{ required: "Campo obrigatório" }}
            />
            <InputComponent
              label="Horário"
              name="horario"
              control={control}
              type="time"
              // value={horarioAtual}
              step="2"
              rules={{ required: "Campo obrigatório" }}
            />
            <InputComponent
              label="Status do Sistema"
              name="status_sistema"
              control={control}
              type="select"
              options={[
                { label: "Ativo", value: "true" },
                { label: "Inativo", value: "false" },
              ]}
              disabled={!isEditing}
            />
          </EqualDivider>

          <EqualDivider>
            <Child></Child>
            {isEditing ? (
              <>
                <Btn variant="blue" type="submit">
                  Editar Dieta
                </Btn>
                <Btn variant="red" type="button" onClick={onDeleteDieta}>
                  Excluir Dieta
                </Btn>
              </>
            ) : (
              <Btn variant="primary" type="submit">
                Enviar Dieta
              </Btn>
            )}
          </EqualDivider>
        </Form>
      </div>
    </div>
  );
};

export default DietaForm;

DietaForm.propTypes = {
  isEditing: PropTypes.bool,
};
