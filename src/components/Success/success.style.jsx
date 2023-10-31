import styled, { keyframes } from "styled-components"

export const Container = styled.div`
	background-color: transparent;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 10px 10px rgba(#000, 0.05);
`

const CircleBorderAnimation = keyframes` //A animação deve estar sempre ANTES do elemento.
	from {
			transform: scale(0);
		}
		to {
			transform: scale(1.1);
		}
`

export const CircleBorder = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;

	z-index: 2;
	position: absolute;
	background: #2d9c0f;
	transform: scale(1.1);
	animation: ${CircleBorderAnimation} 600ms ease;
`

const SuccessAnimation = keyframes` //A animação deve estar sempre ANTES do elemento.
	0% {
			transform: scale(0);
		}
		30% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
`

export const Circle = styled.div`

	width: 60px;
	height: 60px;
	border-radius: 50%;

	z-index: 3;
	position: relative;
	background: white;
	transform: scale(1);
	animation: ${SuccessAnimation} 900ms ease;
`

export const Success = styled.div`

	&::before,
	&::after {
		content: "";
		display: block;
		height: 4px;
		background: #2d9c0f;
		position: absolute;
	}

	&::before {
		width: 17px;
		top: 58%;
		left: 23%;
		transform: rotateZ(50deg);
	}

	&::after {
		width: 30px;
		top: 50%;
		left: 35%;
		transform: rotateZ(-50deg);
	}
`