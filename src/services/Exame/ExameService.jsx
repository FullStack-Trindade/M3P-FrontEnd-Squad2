import { Api } from '../api'; // Importe a instância da Api

export default class ExameService {

  
    async Create(exame, token) {
        const response = await Api.post('/exames', exame, {
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
    }

    async Update(id, exame, token) {
      const response = await Api.put(`/exames/${id}`, exame, {
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
    }

    async GetById(id, token) {
      // Use a função `Api.get` para buscar os detalhes do exame com base no `id`
      const response = await Api.get(`/exames/${id}`, {
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
    }

    async excluirexame(id, token) {
      const response = await Api.delete(`/exames/${id}`, {
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
    }

    };


