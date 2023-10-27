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
        // ... outros métodos
    };
    export default PacienteService;

