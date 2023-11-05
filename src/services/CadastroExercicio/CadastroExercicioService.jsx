import { api } from '../../api/api';

const CadastroExercicioService = {

    async criarExercicio(exercicio, token) {
      const response = await api.post('/exercicios', exercicio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Error desconocido';
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
  
    async atualizarExercicio(id, exercicio, token) {
      const response = await api.put(`/exercicios/${id}`, exercicio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Error desconocido';
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
  
    async getExercicioPorId(id, token) {
     
      const response = await api.get(`/exercicios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Error desconocido';
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
        throw new Error (errorMessage);
      }
    },
  
    async excluirExercicio(id, token) {
      const response = await api.delete(`/exercicios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status) {
        const data = await response.json();
        return data;
      } else {
        let errorMessage = 'Error desconocido';
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
  
export default CadastroExercicioService;