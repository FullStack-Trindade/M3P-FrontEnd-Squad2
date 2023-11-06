import { api } from '../../api/api'; // Importe a instância da API

const UsuarioService = {


    async criarUsuario(usuario, token) {
        const response = await api.post('/usuarios', usuario, {
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

    async atualizarUsuario(id, usuario, token) {
        const response = await api.put(`/usuarios/${id}`, usuario, {
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

    async getUsuarios(token) {
        // Use a função `api.get` para buscar a lista de usuários
        const response = await api.get(`/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("dados retornados no get all:", data);
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

    async getUsuarioPorId(id, token) {
        // Use a função `api.get` para buscar os detalhes do paciente com base no `id`
        const response = await api.get(`/usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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

    async excluirUsuario(id, token) {
        const response = await api.delete(`/usuarios/${id}`, {
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
export default UsuarioService;

