import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from "../../InputForm/inputFormComponent";
import UsuarioService from "../../../services/Usuario/Usuario.service";

import {
    UsuariosForm as Form,
    UsuariosFormLabel as Label,
    UsuariosFormEqualDivider as EqualDivider,
    UsuariosFormChild as Child,
    UsuariosFormBtnCustom as Btn,
} from "./UsuariosForm.style";

//token consumindo do local storage
const token = localStorage.getItem("@Auth:token");


const UsuariosFormComponent = ({ isEditing = false }) => {
    const { id } = useParams();
    const { handleSubmit, control, setValue, reset } = useForm();
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    // Define o estado de edição com base no ID da rota
    useEffect(() => {
        if (id) {
            // Se o ID existe, estamos em modo de edição, então buscamos os detalhes do usuario
            const fetchUsuarioDetails = async () => {
                try {
                    const response = await UsuarioService.getUsuarioPorId(id, token);
                    if (response) {
                        // Define os detalhes do usuario nos campos do formulário
                        const usuario = response;
                        Object.keys(usuario).forEach((key) => {
                            setValue(key, usuario[key]);
                        });
                    }
                } catch (error) {
                    console.error("Erro ao buscar detalhes do usuario:", error);
                }
            };

            fetchUsuarioDetails();
        } else {
            reset();
        }
    }, [id, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            //lista dados do usuario a serem enviados
            console.log(data);
            if (id) {
                // Se há um ID, estamos em modo de edição
                delete data.cpf;
                delete data.email;
                await UsuarioService.atualizarUsuario(id, data, token);
                toast.success(`Usuario ${data.nomeCompleto} atualizado com sucesso!`, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                    autoClose: 2000,
                });
            } else {
                //adiciona o status PADRÃO ao data
                setStatus(true);
                data = { ...data, status };
                // Caso contrário, estamos criando um novo usuario

                const response = await UsuarioService.criarUsuario(data, token);
                toast.success(`Cadastro do usuário: ${response.nomeCompleto} realizado com sucesso!`, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                    autoClose: 2000,
                });
                navigate('/editausuario/' + response.usuarioId);

            }
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                const errorMessage = error.response.data.message || "Erro desconhecido";
                toast.error(`Erro 409: ${errorMessage}`, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                    autoClose: 2000,
                });
            } else {
                toast.error(`Erro ao cadastrar usuário: ${error.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                    autoClose: 2000,
                });
            }
        }
    };

    const onDeleteUsuario = async () => {
        try {
            await UsuarioService.excluirUsuario(id, token);
            toast.success(`Exclusão do usuário realizada com sucesso!`, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
                autoClose: 2000,
            });
            navigate('/cadastrausuarios');
        } catch (error) {
            toast.error(`Erro ao excluir usuario: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
                autoClose: 2000,
            });
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <EqualDivider>
                    <Label $tittle>DADOS USUÁRIO</Label>
                </EqualDivider>
                <EqualDivider>
                    <InputComponent
                        label="Nome Completo"
                        name="nomeCompleto"
                        control={control}
                        type="text"
                        placeholder="Digite o nome completo"
                        rules={{
                            required: "Campo obrigatório",
                            minLength: {
                                value: 8,
                                message: "Nome deve ter pelo menos 8 caracteres",
                            },
                            maxLength: {
                                value: 64,
                                message: "Nome deve ter no máximo 64 caracteres",
                            },
                        }}
                    />
                    <InputComponent
                        label="Gênero"
                        name="genero"
                        control={control}
                        type="select"
                        options={[
                            { label: "Selecione o gênero", value: "" },
                            { label: "Masculino", value: "MASCULINO" },
                            { label: "Feminino", value: "FEMININO" },
                            { label: "Outro", value: "OUTRO" },
                            { label: "Prefiro não informar", value: " NÃO INFORMADO" },
                        ]}
                        rules={{ required: "Campo obrigatório" }}
                    />
                </EqualDivider>
                <EqualDivider>
                    <InputComponent
                        label="CPF"
                        name="cpf"
                        control={control}
                        type="text"
                        mask={[
                            /\d/,
                            /\d/,
                            /\d/,
                            ".",
                            /\d/,
                            /\d/,
                            /\d/,
                            ".",
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                        ]}
                        placeholder="000.000.000-00"
                        guide={true}
                        rules={{
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                message: "CPF inválido (000.000.000-00)",
                            },
                        }}
                        disabled={isEditing}
                    />

                    <InputComponent
                        label="Telefone"
                        name="telefone"
                        control={control}
                        type="text"
                        mask={[
                            "(",
                            /[1-9]/,
                            /\d/,
                            ")",
                            " ",
                            /[1-9]/,
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                        ]}
                        placeholder="(99) 9 9999-9999"
                        guide={true}
                        rules={{
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                                message: "Telefone inválido (exemplo: (99) 9 9999-9999)",
                            },
                        }}
                    />

                </EqualDivider>
                <EqualDivider>

                    <InputComponent
                        label="E-mail"
                        name="email"
                        control={control}
                        type="email"
                        placeholder="email@site.com"
                        rules={{
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Endereço de e-mail inválido",
                            },
                        }}
                    />
                    <InputComponent
                        label="Senha"
                        name="senha"
                        control={control}
                        type="password"
                        placeholder="Digite a senha"
                        rules={{
                            required: "Campo obrigatório",
                            minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" }
                        }}
                    />
                </EqualDivider>
                <EqualDivider>
                    <Child />
                    <InputComponent
                        label="Tipo de Usuário"
                        name="tipo"
                        control={control}
                        type="select"
                        options={[
                            { label: "Selecione o tipo", value: "" },
                            { label: "Administrador", value: "ADMINISTRADOR" },
                            { label: "Médico", value: "MEDICO" },
                            { label: "Enfermeiro", value: "ENFERMEIRO" }
                        ]}
                        rules={{ required: "Campo obrigatório" }}
                    />

                    <InputComponent
                        label="Status do Sistema"
                        name="statusSistema"
                        control={control}
                        type="select"
                        options={[
                            { label: "Ativo", value: "true" },
                            { label: "Inativo", value: "false" },
                        ]}
                        disabled={!isEditing}
                    />
                    <Child />
                </EqualDivider>
                <EqualDivider>
                    <Child></Child>
                    {isEditing ? (
                        <>
                            <Btn variant="blue" type="submit">
                                Editar Usuário
                            </Btn>
                            <Btn variant="red" type="button" onClick={onDeleteUsuario}>
                                Excluir Usuário
                            </Btn>
                        </>
                    ) : (
                        <Btn variant="primary" type="submit">
                            Enviar Usuário
                        </Btn>
                    )}
                </EqualDivider>
            </Form>
        </>
    );
};

export default UsuariosFormComponent;

UsuariosFormComponent.propTypes = {
    isEditing: PropTypes.bool,
};
