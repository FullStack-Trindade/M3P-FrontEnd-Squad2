import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth/Auth.context';
import { toast } from "react-toastify";
import * as Styled from './LoginForm.style';
import logo from '../../../assets/images/logoP.png'
import InputComponent from '../../Input/Input.component';

export const LoginFormComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const auth = useContext(AuthContext);

    const submitForm = async (data) => {

        await auth.login(data.email, data.senha)
    }

    const criarConta = () => {
        toast.info("Entre em contato com um administrador para cadastro de um novo usuário!", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            autoClose: 5000
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
                {/* <InputComponent id='email' label="Email" placeholder="Digite seu email" type="email" register={{ ...register('email', { required: "O email é obrigatório", validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) } }) }} error={errors.email} />
                <InputComponent id='senha' label="Senha" placeholder="Digite sua senha" type="password" register={{ ...register('senha', { required: "A senha é obrigatória" }) }} error={errors.senha} />*/}
                <input type="email" id="email" {...register('email', { required: "O email é obrigatório", validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) } })} />
                <input type="password" id="senha" {...register('senha', { required: "A senha é obrigatória" })} />
                <Styled.Botao type='submit'>Entrar</Styled.Botao>
                <Styled.EsqueceuSenha href='#'>Esqueci minha senha</Styled.EsqueceuSenha>
            </Styled.Main>
            <Styled.Footer>
                <img src={logo} alt="" />
            </Styled.Footer>
        </Styled.FormLogin>
    )
}
