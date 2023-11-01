import { createContext, useState } from "react";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { Api } from "../../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    const login = async (email, senha) => {
        try {
            const response = await Api.post('/usuarios/login', { email, senha })
            const token = response.data.token;
            const usuario = jwt_decode(token);
            setUsuario(usuario);
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('@Auth:token', token);
            localStorage.setItem('@Auth:user', usuario);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        } catch (error) {
            toast.error(error.response?.data?.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            })
        }

    }

    const logout = async () => {
        setUsuario(null);
        Api.defaults.headers.common['Authorization'] = undefined;
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:user');
    }

    return (
        <AuthContext.Provider value={{ usuario, autenticado: !!usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}