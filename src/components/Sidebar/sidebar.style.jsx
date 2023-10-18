import styled from "styled-components"

export const Sidebar = styled.nav`
	display: flex;
	flex-direction: column;
	background-color: #004a63;
	color: #fefefe;
	width: 250px;
	height: 100vh;
	min-height: 100%;
	/* width: ${({ $isOpened }) => {
		return $isOpened ? "280px" : "70px"
	}}; */
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

    li::marker {
        content: "";
    }

    input[type="radio"] {
        display: none;
    }

    input[type="radio"]:checked + label{
        color: limegreen;
    }
`

export const Footer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
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
