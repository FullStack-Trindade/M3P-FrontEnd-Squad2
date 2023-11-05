import { api } from '../../api/api'; 

const ConsultaService = {

  async criarConsulta(consulta, token) {
    const response = await api.post('/consultas', consulta, {
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

  async atualizarConsulta(id, consulta, token) {
    const response = await api.put(`/consultas/${id}`, consulta, {
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

  async getConsultaPorId(id, token) {
   
    const response = await api.get(`/consultas/${id}`, {
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

  async excluirConsulta(id, token) {
    const response = await api.delete(`/consultas/${id}`, {
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

export default ConsultaService;
