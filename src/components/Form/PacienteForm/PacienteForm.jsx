import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PacienteService from "../../../services/Paciente/PacienteService";
import EnderecoService from "../../../services/Endereco/EnderecoService";
import PropTypes from "prop-types";
import InputComponent from "../../InputForm/inputFormComponent";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import {
  Form,
  Label,
  EqualDivider,
  Child,
  BtnCustom as Btn,
} from "./PacienteForm.styled";

//token manual depois deve consumir de um local storage
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODg4MjM2MywiZXhwIjoxNjk4OTY4NzYzfQ.AKLEbojUaY0Drp288h0rPud0pe01SB9ZREcUu8_a1_w";


const PacienteForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const { handleSubmit, control, setValue, reset } = useForm();
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  // Define o estado de edição com base no ID da rota
  useEffect(() => {
    if (id) {
      // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do paciente
      const fetchPacienteDetails = async () => {
        try {
          const response = await PacienteService.getPacientePorId(id, token);
          if (response) {
            // Define os detalhes do paciente nos campos do formulário
            const paciente = response;
            Object.keys(paciente).forEach((key) => {
              setValue(key, paciente[key]);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes do paciente:", error);
        }
      };

      fetchPacienteDetails();
    }else{
      reset();
    }
  }, [id, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      //lista dados do paciente a serem enviados
      console.log(data);
      if (id) {
        // Se há um ID, estamos em modo de edição
        delete data.cpf;
        delete data.rg;
        await PacienteService.atualizarPaciente(id, data, token);
        toast.success(`Paciente ${data.nome_completo} atualizado com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
      });
      } else {
        //adiciona o status PADRÃO ao data
        setStatus(true);
        data = { ...data, status };
        // Caso contrário, estamos criando um novo paciente
        const response = await PacienteService.criarPaciente(data, token);
        toast.success(`Cadastro do paciente: ${response.nome_completo} realizado com sucesso!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
      });
      navigate('/editapaciente/'+response.id);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || "Erro desconhecido";
        toast.error(`Erro 409: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      } else {
        toast.error(`Erro ao cadastrar paciente: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          autoClose: 2000,
        });
      }
    }
  };

  const onDeletePaciente = async () => {
    try {
      await PacienteService.excluirPaciente(id, token);
      toast.success(`Exclusão do paciente realizada com sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        autoClose: 2000,
    });
    navigate('/cadastrapaciente');
    } catch (error) {
      toast.error(`Erro ao excluir paciente: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        autoClose: 2000,
      });
    }
  };

  const handleCepBlur = async (value) => {
    if (value) {
      try {
        const endereco = await EnderecoService(value);

        if (endereco) {
          setValue("endereco.cep", value);
          setValue("endereco.cidade", endereco.cidade);
          setValue("endereco.estado", endereco.estado);
          setValue("endereco.logradouro", endereco.logradouro);
          setValue("endereco.bairro", endereco.bairro);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EqualDivider>
          <Label $tittle>DADOS PESSOAIS</Label>
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Nome Completo"
            name="nome_completo"
            control={control}
            type="text"
            placeholder="Informe o nome completo"
            rules={{
              required: "Campo obrigatório",
              minLength: {
                value: 8,
                message: "Nome deve ter pelo menos 8 caracteres",
              },
              maxLength: {
                value: 64,
                message: "Nome deve ter no máximo 64 caracteres",
              },
            }}
          />
          <InputComponent
            label="Gênero"
            name="genero"
            control={control}
            type="select"
            options={[
              { label: "Selecione o gênero", value: "" },
              { label: "Masculino", value: "MASCULINO" },
              { label: "Feminino", value: "FEMININO" },
              { label: "Outro", value: "OUTRO" },
              { label: "Prefiro não informar", value: " NÃO INFORMADO" },
            ]}
            rules={{ required: "Campo obrigatório" }}
          />
          <InputComponent
            label="Data de Nascimento"
            name="data_nascimento"
            control={control}
            type="date"
            rules={{ required: "Campo obrigatório" }}
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="CPF"
            name="cpf"
            control={control}
            type="text"
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            placeholder="000.000.000-00"
            guide={true}
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                message: "CPF inválido (000.000.000-00)",
              },
            }}
            disabled={isEditing}
          />
          <InputComponent
            label="RG"
            name="rg"
            control={control}
            type="text"
            placeholder="ex: 23443235-5 SSP"
            rules={{
              required: "Campo obrigatório",
              maxLength: {
                value: 20,
                message: "Nome deve ter no máximo 64 caracteres",
              },
            }}
            disabled={isEditing}
          />
          <InputComponent
            label="Estado Civil"
            name="estado_civil"
            control={control}
            type="select"
            options={[
              { label: "Selecione o gênero", value: "" },
              { label: "Solteiro", value: "SOLTEIRO" },
              { label: "Casado", value: "CASADO" },
              { label: "Divorciado", value: "DIVORCIADO" },
              { label: "Viuvo(a)", value: "VIUVO" },
            ]}
            rules={{ required: "Campo obrigatório" }}
          />
          <InputComponent
            label="Naturalidade"
            name="naturalidade"
            control={control}
            type="text"
            placeholder="Informe a naturalidade"
            rules={{
              required: "Campo obrigatório",
              minLength: {
                value: 8,
                message: "Deve ter pelo menos 8 caracteres",
              },
              maxLength: {
                value: 64,
                message: "Deve ter no máximo 64 caracteres",
              },
            }}
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Telefone"
            name="telefone"
            control={control}
            type="text"
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              " ",
              /[1-9]/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            placeholder="(99) 9 9999-9999"
            guide={true}
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                message: "Telefone inválido (exemplo: (99) 9 9999-9999)",
              },
            }}
          />
          <InputComponent
            label="E-mail"
            name="email"
            control={control}
            type="email"
            placeholder="email@site.com"
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Endereço de e-mail inválido",
              },
            }}
          />
          <InputComponent
            label="Contato de Emergência"
            name="contato_emergencia"
            control={control}
            type="text"
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              " ",
              /[1-9]/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            placeholder="(99) 9 9999-9999"
            guide={true}
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                message:
                  "Telefone de contato inválido (exemplo: (99) 9 9999-9999)",
              },
            }}
          />
        </EqualDivider>
        <EqualDivider>
        <InputComponent
              label="Status do Sistema"
              name="status"
              control={control}
              type="select"
              options={[
                { label: "Ativo", value: "true" },
                { label: "Inativo", value: "false" },
              ]}
              disabled={!isEditing}
            />
             <Child/>
             <Child/>
        </EqualDivider>
        <EqualDivider>
          <Label $tittle>DADOS MÉDICOS</Label>
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Lista de Alergias"
            name="lista_alergias"
            control={control}
            type="text"
            placeholder="Informe se possui alergias"
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Lista de Cuidados Específicos"
            name="lista_cuidados"
            control={control}
            type="text"
            placeholder="Informe se necessita de cuidados especiais"
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Convênio"
            name="nome_convenio"
            control={control}
            type="text"
            placeholder="Informe o convênio"
          />
          <InputComponent
            label="Número do Convênio"
            name="numero_convenio"
            control={control}
            type="text"
            placeholder="Informe o número do convênio"
          />
          <InputComponent
            label="Validade do Convênio"
            name="validade_convenio"
            control={control}
            type="date"
          />
        </EqualDivider>
        
        <EqualDivider>
          <Label $tittle>ENDEREÇO</Label>
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="CEP"
            name="endereco.cep"
            control={control}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            guide={true}
            type="text"
            placeholder={"00000-000"}
            // onBlur={(e) => handleCepBlur(e.target.value)}
            onChange={(e) => {
              const cleanedCep = e.target.value.replace(/[^0-9]/g, "");
              if (cleanedCep.length === 8) {
                handleCepBlur(cleanedCep);
              }
            }}
            rules={{
              required: "Campo obrigatório",
            }}
          />
          <InputComponent
            label="Cidade"
            name="endereco.cidade"
            control={control}
            type="text"
            placeholder={"Informe a cidade"}
            rules={{ required: "Campo obrigatório" }}
          />
          <InputComponent
            label="Estado"
            name="endereco.estado"
            control={control}
            type="text"
            placeholder={"Informe o estado"}
            rules={{ required: "Campo obrigatório" }}
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Logradouro"
            name="endereco.logradouro"
            control={control}
            type="text"
            placeholder={"Informe o logradouro"}
            rules={{ required: "Campo obrigatório" }}
          />
          <InputComponent
            label="Bairro"
            name="endereco.bairro"
            control={control}
            type="text"
            placeholder={"Informe o bairro"}
          />
          <InputComponent
            label="Número"
            name="endereco.numero"
            control={control}
            type="text"
            placeholder={"Informe o número"}
            rules={{ required: "Campo obrigatório" }}
          />
        </EqualDivider>
        <EqualDivider>
          <InputComponent
            label="Complemento"
            name="endereco.complemento"
            control={control}
            type="text"
            placeholder={"Informe o complemento"}
          />
          <InputComponent
            label="Ponto de Referência"
            name="endereco.ponto_referencia"
            control={control}
            type="text"
            placeholder={"Informe o ponto de referência"}
            rules={{ required: "Campo obrigatório" }}
          />
        </EqualDivider>

        <EqualDivider>
          <Child></Child>
          {isEditing ? (
            <>
              <Btn variant="blue" type="submit">
                Editar Paciente
              </Btn>
              <Btn variant="red" type="button" onClick={onDeletePaciente}>
                Excluir Paciente
              </Btn>
            </>
          ) : (
            <Btn variant="primary" type="submit">
              Enviar Paciente
            </Btn>
          )}
        </EqualDivider>
      </Form>
    </>
  );
};

export default PacienteForm;

PacienteForm.propTypes = {
  isEditing: PropTypes.bool,
};
