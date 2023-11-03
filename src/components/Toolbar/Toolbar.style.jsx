import styled from "styled-components";

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 7.5rem;
	padding: 0 1rem;

	background-color: #004a63;
	color: #fff;
`;

export const TituloPagina = styled.h1`
	font-size: 1.8rem;
	font-weight: 600;
	text-transform: uppercase;
	margin-left: 0.5rem;
`;

export const NomePerfil = styled.h2`
	font-size: 1rem;
	font-weight: 400;
	text-transform: uppercase;
`;

export const Perfil = styled.button`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	background-color: transparent;
	border: none;
	color: #fff;
	cursor: pointer;
	position: relative;
	svg {
		font-size: 3.5rem;
	}
`;

export const PerfilDropdown = styled.div`
	position: absolute;
	top: 3.5rem;
	right: 0;
	width: 15rem;
	height: 6rem;
	background-color: #fff;
	color: #004a63;
	border-radius: 0.5rem;
	box-shadow: 0 0 1rem #004a63;
	padding: 1rem;
	display: ${({ $hasOpen }) => ($hasOpen ? "flex" : "none")};
	flex-direction: column;
	z-index: 1;
`;

export const PerfilDropdownItem = styled.a`
	background-color: transparent;
	border: none;
	color: #004a63;
	font-size: 1.2rem;
	font-weight: 600;
	text-decoration: none;
	text-transform: uppercase;
	cursor: pointer;
	padding: 0.3rem;
	width: 100%;
	display: flex;
	align-items: flex-end;
	gap: 1rem;
	svg {
		font-size: 1.5rem;
	}
	&:hover {
		background-color: #004a63;
		color: #fff;
	}
`;
