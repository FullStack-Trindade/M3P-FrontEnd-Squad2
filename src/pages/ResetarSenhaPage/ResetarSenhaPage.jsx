import { ResetarSenhaForm } from "../../components/Form/ResetarSenhaForm/ResetarSenhaForm";
import * as Styled from "./ResetarSenha.style";

export const ResetarSenhaPage = () => {
    return (
        <Styled.ResetarSenhaContainer>
            <Styled.ImageResetarSenha />
            <ResetarSenhaForm />
        </Styled.ResetarSenhaContainer>
    )
}
