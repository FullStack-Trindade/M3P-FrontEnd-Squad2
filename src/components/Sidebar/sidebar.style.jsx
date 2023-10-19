import styled from "styled-components"

export const Sidebar = styled.nav`
	display: flex;
	flex-direction: column;
	background-color: #004a63;
	color: #fefefe;
	height: 100vh;
	min-height: 100%;
	width: ${({ $isOpened }) => {
		return $isOpened ? "200px" : "60px"
	}};
	inset: 0;
	padding: 0.5rem;
`

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	/* align-content: center; */
	align-items: center;
	justify-content: center;

	button {
		padding: 0;
		background-color: transparent;
		border: 0;
		color: #fefefe;

		&:hover {
			cursor: pointer;
		}
	}
`

export const Body = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	color: #888888;
	margin: 1rem 0;
`
export const ListGroup = styled.div`
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	p {
		display: flex;
		justify-content: center;
		color: #fefefe;
	}

	li {
		padding: 10px;
		display: flex;
		align-content: center;
		align-items: baseline;
		border-radius: .5rem;
		gap: 5px;;
	}

	li:hover {
		cursor: pointer;
		background-color: #888;
		
		& > * {
			color: #fff;
		}
	}

	li::marker {
		content: "";
	}

	li label:hover {
		cursor: pointer;
	}

	input[type="radio"] {
		display: none;
	}

	input[type="radio"]:checked + label {
		color: limegreen;
	}
`

export const Footer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	/* justify-content: flex-end; */
`

export const UserContainer = styled.div`
	display: flex;
	flex-direction: ${({ $isOpened }) => {
		return $isOpened ? "row" : "column"
	}};
	gap: 0.5rem;
	padding: .5rem;
`

export const LogoutBtn = styled.button`
	align-self: ${({ $isOpened }) => {
		return $isOpened ? "flex-end" : "center"
	}};
	padding: 0;
	background-color: transparent;
	border: 0;
	color: #fefefe;

	&:hover {
		cursor: pointer;
	}
`
