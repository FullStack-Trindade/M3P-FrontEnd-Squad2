import { useState } from "react";
import InputMask from 'react-input-mask';
import PatientService from "../../services/Paciente/PacienteService";
import enderecoService from "../../services/Endereco/EnderecoService";

//token manual depois deve consumir de um local storage
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODQzOTM0OSwiZXhwIjoxNjk4NTI1NzQ5fQ.tPS2YHt550EH5c5sJ4MvZvsAoFDm_mVkpUi_JBxsosg";

const CadastroPaciente = () => {
  const [paciente, setPaciente] = useState({
    nome_completo: "",
    genero: "",
    data_nascimento: "",
    cpf: "",
    rg: "",
    estado_civil: "",
    telefone: "",
    email: "",
    naturalidade: "",
    contato_emergencia: "",
    lista_alergias: "",
    lista_cuidados: "",
    nome_convenio: "",
    numero_convenio: "",
    validade_convenio: "",
    status: true,
    endereco: {
      cep: "",
      cidade: "",
      estado: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      ponto_referencia: "",
    },
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleCepBlur = async (e) => {
    const { value } = e.target;

    if (value) {
      try {
        const endereco = await enderecoService(value);

        if (endereco) {
          // Preencha os campos do endereço automaticamente
          setPaciente({
            ...paciente,
            endereco: {
              ...endereco,
              cep: value,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const enviarPaciente = async () => {
    try {
      const response = await PatientService.criarPaciente(paciente, token);
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

  return (
    <div>
      <h1>Cadastro de Paciente</h1>
      <form>
        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            name="nome_completo"
            value={paciente.nome_completo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Gênero:</label>
          <select
            name="genero"
            value={paciente.genero}
            onChange={handleInputChange}
          >
            <option value="">Selecione o gênero</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            {/* Adicione mais opções de gênero conforme necessário */}
          </select>
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={paciente.data_nascimento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>CPF:</label>
          <InputMask
          mask="999.999.999-99"
          maskPlaceholder="000.000.000-00"
          value={paciente.cpf}
          onChange={(e) => setPaciente({ ...paciente, cpf: e.target.value })}
        />
        </div>
        <div>
          <label>RG com órgão expedidor:</label>
          <input
            type="text"
            name="rg"
            value={paciente.rg}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Estado Civil:</label>
          <select
            name="estado_civil"
            value={paciente.estado_civil}
            onChange={handleInputChange}
          >
            <option value="">Selecione o estado civil</option>
            <option value="SOLTEIRO">Solteiro</option>
            <option value="CASADO">Casado</option>
            <option value="DIVORCIADO">Divorciado</option>
            <option value="VIUVO">Viúvo</option>
            {/* Adicione mais opções de estado civil conforme necessário */}
          </select>
        </div>
        <div>
          <label>Telefone:</label>
          <InputMask
          mask="(99) 9 9999-9999"
          maskPlaceholder="(00) 9 0000-0000"
          value={paciente.telefone}
          onChange={(e) => setPaciente({ ...paciente, telefone: e.target.value })}
        />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={paciente.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Naturalidade:</label>
          <input
            type="text"
            name="naturalidade"
            value={paciente.naturalidade}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contato de Emergência:</label>
          <InputMask
          mask="(99) 9 9999-9999"
          maskPlaceholder="(00) 9 0000-0000"
            value={paciente.contato_emergencia}
            onChange={(e) => setPaciente({ ...paciente, contato_emergencia: e.target.value })}
          />
        </div>
        <div>
          <label>Lista de Alergias:</label>
          <input
            type="text"
            name="lista_alergias"
            value={paciente.lista_alergias}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Lista de Cuidados Específicos:</label>
          <input
            type="text"
            name="lista_cuidados"
            value={paciente.lista_cuidados}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Convênio:</label>
          <input
            type="text"
            name="nome_convenio"
            value={paciente.nome_convenio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Número do Convênio:</label>
          <input
            type="text"
            name="numero_convenio"
            value={paciente.numero_convenio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Validade do Convênio:</label>
          <input
            type="date"
            name="validade_convenio"
            value={paciente.validade_convenio}
            onChange={handleInputChange}
          />
        </div>
        {/* status só pra teste */}
        <div>
          <label>Status do Sistema:</label>
          <input
            type="text"
            name="status"
            value={paciente.status ? "Ativo" : "Inativo"}
            readOnly
          />
        </div>
        {/* endereço com consumi do via cep */}
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={paciente.endereco.cep} // Usar value em vez de name
            onChange={(e) => {
              // Função para atualizar o valor do CEP no estado do paciente
              setPaciente({
                ...paciente,
                endereco: {
                  ...paciente.endereco,
                  cep: e.target.value,
                },
              });
            }}
            onBlur={handleCepBlur}
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="endereco.cidade"
            value={paciente.endereco.cidade}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="endereco.estado"
            value={paciente.endereco.estado}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Logradouro:</label>
          <input
            type="text"
            name="endereco.logradouro"
            value={paciente.endereco.logradouro}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Número:</label>
          <input
            type="text"
            name="endereco.numero"
            value={paciente.endereco.numero}
            onChange={handleInputChange}
            placeholder="123"
          />
        </div>
        <div>
          <label>Complemento:</label>
          <input
            type="text"
            name="endereco.complemento"
            value={paciente.endereco.complemento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            name="endereco.bairro"
            value={paciente.endereco.bairro}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ponto de Referência:</label>
          <input
            type="text"
            name="endereco.ponto_referencia"
            value={paciente.endereco.ponto_referencia}
            onChange={handleInputChange}
          />
        </div>

        <button type="button" onClick={enviarPaciente}>
          Enviar Paciente
        </button>
      </form>
      <div>{statusMessage}</div>
    </div>
  );
};

export default CadastroPaciente;
