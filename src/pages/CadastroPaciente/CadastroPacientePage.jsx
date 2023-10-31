import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PacienteService from "../../services/Paciente/PacienteService";
import EnderecoService from "../../services/Endereco/EnderecoService";
import TextMask from "react-text-mask";

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
            <label>Nome Completo:</label>
            <Controller
              name="nome_completo"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Gênero:</label>
            <Controller
              name="genero"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Selecione o gênero</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  {/* Adicione mais opções de gênero conforme necessário */}
                </select>
              )}
            />
          </div>
  
          <div>
            <label>Data de Nascimento:</label>
            <Controller
              name="data_nascimento"
              control={control}
              render={({ field }) => <input type="date" {...field} />}
            />
          </div>
  
          <div>
            <label>CPF:</label>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextMask
                  {...field}
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
                  guide={true}
                />
              )}
            />
          </div>
  
          <div>
            <label>RG com órgão expedidor:</label>
            <Controller
              name="rg"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Estado Civil:</label>
            <Controller
              name="estado_civil"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Selecione o estado civil</option>
                  <option value="SOLTEIRO">Solteiro</option>
                  <option value="CASADO">Casado</option>
                  <option value="DIVORCIADO">Divorciado</option>
                  <option value="VIUVO">Viúvo</option>
                  {/* Adicione mais opções de estado civil conforme necessário */}
                </select>
              )}
            />
          </div>
  
          <div>
            <label>Telefone:</label>
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <TextMask
                  {...field}
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
                  guide={true}
                />
              )}
            />
          </div>
  
          <div>
            <label>E-mail:</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input type="email" {...field} />}
            />
          </div>
  
          <div>
            <label>Naturalidade:</label>
            <Controller
              name="naturalidade"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Contato de Emergência:</label>
            <Controller
              name="contato_emergencia"
              control={control}
              render={({ field }) => (
                <TextMask
                  {...field}
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
                  guide={true}
                />
              )}
            />
          </div>
  
          <div>
            <label>Lista de Alergias:</label>
            <Controller
              name="lista_alergias"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Lista de Cuidados Específicos:</label>
            <Controller
              name="lista_cuidados"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Convênio:</label>
            <Controller
              name="nome_convenio"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Número do Convênio:</label>
            <Controller
              name="numero_convenio"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Validade do Convênio:</label>
            <Controller
              name="validade_convenio"
              control={control}
              render={({ field }) => <input type="date" {...field} />}
            />
          </div>
  
          {/* status só pra teste */}
          <div>
            <label>Status do Sistema:</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setValue("status", selectedValue === "true");
                    setStatus(selectedValue === "true");
                  }}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              )}
            />
          </div>
          {/* ... fim do teste de status */}
  
          <div>
            <label>CEP:</label>
            <Controller
              name="endereco.cep"
              control={control}
              render={({ field }) => (
                <TextMask
                  {...field}
                  type="text"
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                  guide={true}
                  onBlur={(e) => handleCepBlur(e.target.value)}
                />
              )}
            />
          </div>
  
          <div>
            <label>Cidade:</label>
            <Controller
              name="endereco.cidade"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Estado:</label>
            <Controller
              name="endereco.estado"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Logradouro:</label>
            <Controller
              name="endereco.logradouro"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Número:</label>
            <Controller
              name="endereco.numero"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Complemento:</label>
            <Controller
              name="endereco.complemento"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Bairro:</label>
            <Controller
              name="endereco.bairro"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
  
          <div>
            <label>Ponto de Referência:</label>
            <Controller
              name="endereco.ponto_referencia"
              control={control}
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
          {/* ... Outros campos de endereço */}
          <button type="submit">Enviar Paciente</button>
        </form>
        <div>Status: {status ? "Ativo" : "Inativo"}</div>
        <div>{statusMessage}</div>
      </div>
    );
  };
  
  export default CadastroPaciente;
