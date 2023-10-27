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

export const TooltipContainer = styled.div`
	display: flex;
	gap: .5rem;
	align-items: center;

	/* para o ToolTip */
	position: relative;

	.tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: black;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;

		/* Position the tooltip */
		position: absolute;
		left: 105%;
		z-index: 1;
	}

	.tooltiptext::after {
		content: " ";
		position: absolute;
		top: 50%;
		right: 100%; /* To the left of the tooltip */
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent black transparent transparent;
	}

	&:hover {
		.tooltiptext {
			visibility: visible;
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

	input[type="radio"] {
		display: none;
	}

	input[type="radio"]:checked ~ svg,
	input[type="radio"]:checked ~ label {
		color: limegreen;
	}
`

export const Li = styled.li`
	padding: 5px .5rem;
	display: flex;
	gap: .5rem;
	align-content: center;
	align-items: center;
	border-radius: 0.5rem;
	width: 100%;

	/* para o ToolTip */
	position: relative;

	.tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: black;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;

		/* Position the tooltip */
		position: absolute;
		left: 105%;
		z-index: 1;
	}

	.tooltiptext::after {
		content: " ";
		position: absolute;
		top: 50%;
		right: 100%; /* To the left of the tooltip */
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent black transparent transparent;
	}

	&:hover {
		cursor: pointer;
		background-color: #888;

		& > * {
			color: #fff;
		}

		& > *:hover {
			cursor: pointer;
		}

		.tooltiptext {
			visibility: visible;
		}
	}

	&::marker {
		content: "";
	}
`

export const Footer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: flex-end; */
`

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: ${({ $isOpened }) => {
		return $isOpened ? "row" : "column"
	}};
	gap: 0.5rem;
	padding: 0.5rem;
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
