import { api } from '../../api/api'; // Importe a instância da APItoken

const DietaService = {

  
    async criarDieta(dieta, token) {
        const response = await api.post('/dietas', dieta, {
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

    async atualizarDieta(id, dieta, token) {
      const response = await api.put(`/dietas/${id}`, dieta, {
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

    async getDietaPorId(id, token) {
      // Use a função `api.get` para buscar os detalhes do dieta com base no `id`
      const response = await api.get(`/dietas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response get dieta por id:", response);
    
      if (response.ok) {
        const data = await response.json();
        console.log("dados retornados no get por id:", data);
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
    async getDietas(token) {
      const response = await api.get(`/dietas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log("dados retornados no get:", data);
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
    

    async excluirDieta(id, token) {
      const response = await api.delete(`/dietas/${id}`, {
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

    async listarPacientes(token) {
      const response = await api.get('/pacientes', {
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
    export default DietaService;