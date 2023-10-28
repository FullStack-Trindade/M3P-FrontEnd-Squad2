import { useState } from 'react';
import PacienteService from '../../services/Paciente/PacienteService';

//token manual depois deve consumir de um local storage
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5ODQzOTM0OSwiZXhwIjoxNjk4NTI1NzQ5fQ.tPS2YHt550EH5c5sJ4MvZvsAoFDm_mVkpUi_JBxsosg";

const MockPaciente = () => {
  const mockPaciente = {
    nome_completo: 'Roberto da Silva h',
    genero: 'MASCULINO',
    data_nascimento: '1990-05-15',
    cpf: '567.543.123-59',
    rg: '56789089SP',
    estado_civil: 'CASADO',
    telefone: '(99) 9 9999-9999',
    email: 'joao.silva@example9.com.bra',
    naturalidade: 'São Paulo',
    contato_emergencia: '(99) 9 9999-9999',
    lista_alergias: 'Nenhuma',
    lista_cuidados: 'Nenhum',
    nome_convenio: 'Plano de Saúde ABC',
    numero_convenio: '12345',
    validade_convenio: '2025-12-31',
    status: true,
    endereco: {
      cep: '12345-678',
      cidade: 'São Paulo',
      estado: 'SP',
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 4',
      bairro: 'Jardim das Rosas',
      ponto_referencia: 'Próximo à escola',
    },
  };

  const [statusMessage, setStatusMessage] = useState('');

  const enviarMockPaciente = async () => {
    console.log(mockPaciente);
    try {
      const response = await PacienteService.criarPaciente(mockPaciente, token);
      setStatusMessage(`Cadastro bem-sucedido. ID do paciente: ${response.id}`);
    } catch (error) {
      setStatusMessage(`Erro ao cadastrar paciente: ${error.message}`);
    }
  };
  
  return (
    <div>
      <h1>Cadastro de Paciente (Mock)</h1>
      <button onClick={enviarMockPaciente}>Enviar Mock de Pacientes</button>
      <div>{statusMessage}</div>
    </div>
  );
};

export default MockPaciente;