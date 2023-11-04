
const baseURL = 'http://localhost:3031/api'; // URL da API pode também usar o env

const defaultHeaders = {
  'Content-Type': 'application/json',
  // acho que o token pode ser passado aqui
};

export const api = {
  get: async (url, options = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: { ...defaultHeaders, ...options.headers },
    });
    return response;
  },

  post: async (url, data, options = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: { ...defaultHeaders, ...options.headers },
      body: JSON.stringify(data),
    });
    return response;
  },

  put: async (url, data, options = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'PUT',
      headers: { ...defaultHeaders, ...options.headers },
      body: JSON.stringify(data),
    });
    return response;
  },

  delete: async (url, options = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'DELETE',
      headers: { ...defaultHeaders, ...options.headers },
    });
    return response;
  },

  patch: async (url, data, options = {}) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'PATCH',
      headers: { ...defaultHeaders, ...options.headers },
      body: JSON.stringify(data),
    });
    return response;
  },

};