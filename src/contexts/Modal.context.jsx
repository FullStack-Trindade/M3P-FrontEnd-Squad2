import { createContext, useState } from "react"

export const ModalContext = createContext({
	show: false,
	setShow: () => {},
})

export const ModalProvider = ({ children }) => {
	const [show, setShow] = useState(false)

	return (
		<ModalContext.Provider value={{ show, setShow}}>
			{children}
		</ModalContext.Provider>
	)
}
