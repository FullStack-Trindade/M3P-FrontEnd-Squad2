
import  api  from "../../api/api";



export default class ExameService {
  async Create(exame, token) {
    const response = await api.post("/exames", exame, {
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
      const response = await api.put(`/exames/${id}`, exame, {
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
      }
      throw new Error(errorMessage);
    }
  
  async GetById(id, token) {
    const response = await api.get(`/exames/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("dados retornados no get por id:", data);
      return data;
    } else {
      let errorMessage = "Erro desconhecido";
      const erroData = await response.json();
      if (erroData) {
        if (erroData.message) {
          errorMessage = erroData.message;
        } else if (erroData.errors && Array.isArray(erroData.errors)) {
          const errorMessages = erroData.errors
            .map((error) => error.message)
            .join(", ");
          errorMessage = errorMessages;
        }
      }
      throw new Error(errorMessage);
    }
  }

  async Delete(id, token) {
    const response = await api.delete(`/exames/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      let errorMessage = "Erro desconhecido";
      const erroData = await response.json();
      if (erroData) {
        if (erroData.message) {
          errorMessage = erroData.message;
        }
      }
      throw new Error(errorMessage);
    }
  }
}
