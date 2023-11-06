import { api } from '../../api/api'; 

const handleCommonErrors = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Error desconocido';
    const errorData = await response.json();
    if (errorData) {
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors.map((error) => error.message).join(', ');
      }
    }
    throw new Error(errorMessage);
  }
};

const ConsultaService = {
  async criarConsulta(consulta, token) {
    const response = await api.post('/consultas', consulta, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleCommonErrors(response);

    return await response.json();
  },

  async atualizarConsulta(id, consulta, token) {
    const response = await api.put(`/consultas/${id}`, consulta, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleCommonErrors(response);

    return await response.json();
  },
  
  async getConsultas( token) {
    const response = await api.get(`/consultas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status) {
      const data = await response.json();
      console.log("dados retornados no get:",data);
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
  async getConsultaPorId(id, token) {
    const response = await api.get(`/consultas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleCommonErrors(response);

    return await response.json();
  },

  async excluirConsulta(id, token) {
    const response = await api.delete(`/consultas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleCommonErrors(response);

    return await response.json();
  },

  async listarPacientes(token) {
    const response = await api.get('/pacientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleCommonErrors(response);

    return await response.json();
  },
};

export default ConsultaService;