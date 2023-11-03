import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import * as Styled from './LoginForm.style';
import logo from '../../../assets/images/logoP.png'
import InputComponent from '../../Input/Input.component';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const LoginFormComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const auth = useAuth();

    const navigate = useNavigate();

    const submitForm = async (data) => {

        await auth.login(data.email, data.senha)
        navigate('/');
    }

    const criarConta = () => {
        toast.info("Entre em contato com um administrador para cadastro de um novo usuário!", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 5000
        });
    }

    const resetarSenha = () => {
        navigate('/resetarSenha');
        toast.info("Salve este código para utilizar na mudança de senha: BEMLAB@3577", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: false,
            closeButton: true,
            delay: 500
        });
    }

    return (
        <Styled.FormLogin onSubmit={handleSubmit(submitForm)}>
            <Styled.Header>
                <Styled.CriarConta>Não possui uma conta?</Styled.CriarConta>
                <Styled.BotaoBox>
                    <Styled.Botao type='button' onClick={criarConta}>Criar Conta</Styled.Botao>
                </Styled.BotaoBox>
            </Styled.Header>
            <Styled.Main>
                <Styled.FormTitle>Login</Styled.FormTitle>
                <InputComponent id='email' label="Email" placeholder="Digite seu email" type="email" register={{ ...register('email', { required: "O email é obrigatório", validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) } }) }} error={errors.email} />
                <InputComponent id='senha' label="Senha" placeholder="Digite sua senha" type="password" register={{ ...register('senha', { required: "A senha é obrigatória" }) }} error={errors.senha} />
                {/* <input type="email" id="email" {...register('email', { required: "O email é obrigatório", validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) } })} />
                <input type="password" id="senha" {...register('senha', { required: "A senha é obrigatória" })} /> */}
                <Styled.Botao type='submit'>Entrar</Styled.Botao>
                <Styled.EsqueceuSenha onClick={resetarSenha}>Esqueci minha senha</Styled.EsqueceuSenha>
            </Styled.Main>
            <Styled.Footer>
                <img src={logo} alt="Logotipo BemLab, com simbolo que remete a medicina, como um sinal de mais e uma folha dentro dele" />
            </Styled.Footer>
        </Styled.FormLogin>
    )
}
