import { api } from '../../api/api'; // Importe a instância da API

const PacienteService = {

  
    async criarPaciente(paciente, token) {
        const response = await api.post('/pacientes', paciente, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            let errorMessage = 'Erro desconhecido';
            const erroData = await response.json();
            if (erroData) {
                if (erroData.message) {
                  errorMessage = erroData.message;
                } else if (erroData.errors && Array.isArray(erroData.errors)) {
                  const errorMessages = erroData.errors
                    .map((error) => error.message)
                    .join(', ');    
                  errorMessage = errorMessages;
                }
              }   
            throw new Error(errorMessage);
          }
    },

    async atualizarPaciente(id, paciente, token) {
      const response = await api.put(`/pacientes/${id}`, paciente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Erro desconhecido';
        const erroData = await response.json();
        if (erroData) {
          if (erroData.message) {
            errorMessage = erroData.message;
          } else if (erroData.errors && Array.isArray(erroData.errors)) {
            const errorMessages = erroData.errors
              .map((error) => error.message)
              .join(', ');
            errorMessage = errorMessages;
          }
        }
        throw new Error(errorMessage);
      }
    },

    async getPacientePorId(id, token) {
      // Use a função `api.get` para buscar os detalhes do paciente com base no `id`
      const response = await api.get(`/pacientes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("dados retornados no get por id:",data);
        return data;
      } else {
        let errorMessage = 'Erro desconhecido';
        const erroData = await response.json();
        if (erroData) {
          if (erroData.message) {
            errorMessage = erroData.message;
          } else if (erroData.errors && Array.isArray(erroData.errors)) {
            const errorMessages = erroData.errors
              .map((error) => error.message)
              .join(', ');
            errorMessage = errorMessages;
          }
        }
        throw new Error(errorMessage);
      }
    },

    async excluirPaciente(id, token) {
      const response = await api.delete(`/pacientes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Erro desconhecido';
        const erroData = await response.json();
        if (erroData) {
          if (erroData.message) {
            errorMessage = erroData.message;
          }
        }
        throw new Error(errorMessage);
      }
    },

    };
    export default PacienteService;

