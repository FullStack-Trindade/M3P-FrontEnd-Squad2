import { TbUserCircle, TbLogout } from "react-icons/tb";
import * as Styled from "./Toolbar.style";
import { useToolbarContext } from "../../hooks/useToolbarContext";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const ToolbarComponent = () => {
	const { titulo } = useToolbarContext();

	const [abrirDropdown, setAbrirDropdown] = useState(false);

	const { usuario, logout } = useAuth();

	const navigate = useNavigate();

	const handleAbrirDropdown = () => {
		setAbrirDropdown(!abrirDropdown);
	};

	const handleSair = async () => {
		logout();
		navigate('/login');
	}

	return (
		<Styled.Header>
			<Styled.TituloPagina>{titulo}</Styled.TituloPagina>
			<Styled.Perfil onClick={handleAbrirDropdown}>
				<Styled.NomePerfil>{usuario.nomeCompleto}</Styled.NomePerfil>
				<TbUserCircle />
				<Styled.PerfilDropdown $hasOpen={abrirDropdown}>
					{/* opcional para adicionar link para configurações aqui <Styled.PerfilDropdownItem></Styled.PerfilDropdownItem> */}
					<Styled.PerfilDropdownItem onClick={handleSair}>
						<TbLogout />
						Sair
					</Styled.PerfilDropdownItem>
				</Styled.PerfilDropdown>
			</Styled.Perfil>
		</Styled.Header>
	);
};
