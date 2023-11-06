// ProntuarioService.jsx
import { api } from '../../api/api';

const ProntuarioService = {


  async getPatientById(patientId, token) {
    const response = await api.get(`/prontuarios/${patientId}`, {
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

  async getAllPacientes(token) {
    try {
      const response = await api.get('/prontuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
    } catch (error) {
      throw new Error(`Erro ao buscar a lista de pacientes: ${error.message}`);
    }
  },
};

export default ProntuarioService;