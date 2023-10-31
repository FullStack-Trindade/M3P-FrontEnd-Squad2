import { useState } from "react";
import { useForm } from "react-hook-form";
import PacienteService from "../../services/Paciente/PacienteService";
import EnderecoService from "../../services/Endereco/EnderecoService";
import InputComponent from "./inputFormComponent";
import { Btn } from "../../components/Button/button.style";

//token manual depois deve consumir de um local storage
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODc1NjU2NywiZXhwIjoxNjk4ODQyOTY3fQ.ZoW0NeSw_Ng-TjHWSTMp2WP7M6nNGPRym3cVaP8ZlgU";

const CadastroPaciente = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [statusMessage, setStatusMessage] = useState("");
  const [status, setStatus] = useState(true);

  const onSubmit = async (data) => {
    try {
      //adiciona o status ao data
      data = { ...data, status };
      //lista dados do paciente a serem enviados
      console.log(data);
      const response = await PacienteService.criarPaciente(data, token);
      setStatusMessage(`Cadastro bem-sucedido. ID do paciente: ${response.id}`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message || "Erro desconhecido";
        setStatusMessage(`Erro 409: ${errorMessage}`);
      } else {
        setStatusMessage(`Erro ao cadastrar paciente: ${error.message}`);
      }
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
    <div>
      <h1>Cadastro de Paciente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputComponent
            label="Nome Completo"
            name="nome_completo"
            control={control}
            type="text"
            placeholder="Informe o nome completo"
          />
        </div>

        <div>
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
          />
        </div>

        <div>
        <InputComponent
          label="Data de Nascimento"
          name="data_nascimento"
          control={control}
          type="date"
        />
        </div> 
        
        <div>
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
        />
        </div>

        <div>
          <InputComponent
            label="RG com órgão expedidor"
            name="rg"
            control={control}
            type="text"
            placeholder="ex: 23443235-5 SSP"
          />
        </div>

        <div>
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
          />
        </div>

        <div>
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
          />
        </div>

        <div>
          <InputComponent
            label="E-mail"
            name="email"
            control={control}
            type="email"
            placeholder="email@site.com"
          />
        </div>

        <div>
          <InputComponent
            label="Naturalidade"
            name="naturalidade"
            control={control}
            type="text"
            placeholder="Informe a naturalidade"
          />
        </div>

        <div>
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
          />
        </div>

        <div>
          <InputComponent
            label="Lista de Alergias"
            name="lista_alergias"
            control={control}
            type="text"
            placeholder="Informe se possui alergias"
          />
        </div>

        <div>
          <InputComponent
            label="Lista de Cuidados Específicos"
            name="lista_cuidados"
            control={control}
            type="text"
            placeholder="Informe se necessita de cuidados especiais"
          />
        </div>

        <div>
          <InputComponent
            label="Convênio"
            name="nome_convenio"
            control={control}
            type="text"
            placeholder="Informe o convênio"
          />
        </div>

        <div>
          <InputComponent
            label="Número do Convênio"
            name="numero_convenio"
            control={control}
            type="text"
            placeholder="Informe o número do convênio"
          />
        </div>

        <div>
          <InputComponent
            label="Validade do Convênio"
            name="validade_convenio"
            control={control}
            type="date"
          />
        </div>

        {/* status só pra teste */}
        <div>
          <InputComponent
            label="Status do Sistema"
            name="status"
            control={control}
            type="select"
            options={[
              { label: "Ativo", value: "true" },
              { label: "Inativo", value: "false" },
            ]}
            onChange={(selectedValue) => {
              setValue("status", selectedValue === "true");
              setStatus(selectedValue === "true");
            }}
          />
        </div>
        {/* ... fim do teste de status */}

        <div>
          <InputComponent
            label="CEP"
            name="endereco.cep"
            control={control}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            guide={true}
            type="text"
            placeholder={"00000-000"}
            onBlur={(e) => handleCepBlur(e.target.value)}
          />
        </div>

        <div>
          <InputComponent
            label="Cidade"
            name="endereco.cidade"
            control={control}
            type="text"
            placeholder={"Informe a cidade"}
          />
        </div>

        <div>
          <InputComponent
            label="Estado"
            name="endereco.estado"
            control={control}
            type="text"
            placeholder={"Informe o estado"}
          />
        </div>

        <div>
          <InputComponent
            label="Logradouro"
            name="endereco.logradouro"
            control={control}
            type="text"
            placeholder={"Informe o logradouro"}
          />
        </div>

        <div>
          <InputComponent
            label="Número"
            name="endereco.numero"
            control={control}
            type="text"
            placeholder={"Informe o número"}
          />
        </div>

        <div>
          <InputComponent
            label="Complemento"
            name="endereco.complemento"
            control={control}
            type="text"
            placeholder={"Informe o complemento"}
          />
        </div>

        <div>
          <InputComponent
            label="Bairro"
            name="endereco.bairro"
            control={control}
            type="text"
            placeholder={"Informe o bairro"}
          />
        </div>

        <div>
          <InputComponent
            label="Ponto de Referência"
            name="endereco.ponto_referencia"
            control={control}
            type="text"
            placeholder={"Informe o ponto de referência"}
          />
        </div>
        <Btn type="submit">Enviar Paciente</Btn>
      </form>
      <div>Status: {status ? "Ativo" : "Inativo"}</div>
      <div>{statusMessage}</div>
    </div>
  );
};

export default CadastroPaciente;
