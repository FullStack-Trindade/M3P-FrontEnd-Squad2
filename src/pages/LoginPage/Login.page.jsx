import { LoginFormComponent } from '../../components/Form/LoginForm/LoginForm.component';
import * as Styled from './Login.style';

export const LoginPage = () => {
	return (
		<Styled.LoginContainer>
			<Styled.ImageLogin />
			<LoginFormComponent />
		</Styled.LoginContainer>
	);
};
