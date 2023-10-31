import { useContext } from 'react'
import * as Styled from './success.style'
import { ModalContext } from '../../contexts/Modal.context'

export default function SuccessComponent() {
	const { setShow } = useContext(ModalContext)

	setTimeout(() => {
		setShow(false)
	}, 1500)

	return (
        <>
	    <Styled.Container>
			<Styled.CircleBorder />
			<Styled.Circle>
				<Styled.Success />
			</Styled.Circle>
		</Styled.Container>
        </>
	)
}