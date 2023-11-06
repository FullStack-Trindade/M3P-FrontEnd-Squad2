import { useForm } from "react-hook-form";
import * as Styled from "./ResetarSenhaForm.style";
import { Api } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import InputComponent from "../../Input/Input.component";
import logo from '../../../assets/images/logoP.png'

export const ResetarSenhaForm = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, novaSenha, codigo } = data;
        try {
            const response = await Api.patch("/usuarios/resetarsenha", { email, novaSenha, codigo });
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
            })
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message, {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
            })
            reset();
        }
    }

    return (
        <Styled.ResetarSenhaForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.ResetarSenhaHeader>
            </Styled.ResetarSenhaHeader>
            <Styled.ResetarSenhaMain>
                <Styled.ResetarSenhaFormTitle>Resetar Senha</Styled.ResetarSenhaFormTitle>
                <InputComponent
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    register={{ ...register('email', { required: "O email é obrigatório", validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) } }) }}
                    error={errors.email}
                />
                <InputComponent
                    label="Nova Senha"
                    id="novaSenha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    register={{ ...register('novaSenha', { required: "Nova Senha é obrigatória", minLength: { value: 6, message: "A nova senha deve ter no mínimo 6 caracteres" } }) }}
                    error={errors.novaSenha}
                />
                <InputComponent
                    label="Código de Verificação"
                    id="codigo"
                    type="text"
                    placeholder="Digite o código de verificação informado"
                    register={{ ...register('codigo', { required: "Código de verificação é obrigatório", minLength: { value: 8, message: "O código de verificação deve ter no mínimo 8 caracteres" } }) }}
                    error={errors.codigo}
                />

                <Styled.ResetarSenhaBotao type="submit">Enviar</Styled.ResetarSenhaBotao>
                <Styled.VoltarLogin to="/login">Voltar para Login</Styled.VoltarLogin>
            </Styled.ResetarSenhaMain>
            <Styled.ResetarSenhaFooter>
                <img src={logo} alt="Logotipo BemLab, com simbolo que remete a medicina, como um sinal de mais e uma folha dentro dele" />
            </Styled.ResetarSenhaFooter>
        </Styled.ResetarSenhaForm>
    )
}
