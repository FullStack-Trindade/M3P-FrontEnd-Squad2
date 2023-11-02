import React, { useContext } from "react"
import { ModalContext } from "../../contexts/Modal.context"
import { Modal } from "react-bootstrap"

export default function ModalComponent({ children }) {
	const { show, setShow } = useContext(ModalContext)

	const handleClose = () => {
		setShow(false)
	}

	return (
		<Modal
			show={show}
			onEscapeKeyDown={handleClose}
			onHide={handleClose}
			centered
			style={{ backgroundColor: "rgba(0,0,0, 0.3)" }}
		>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	)
}
