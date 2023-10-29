import { useContext } from "react"
import { ModalContext } from "../contexts/Modal.context"

export const useModalContext = () => {
    const provider = useContext(ModalContext)

    if(!provider) {
        throw new Error("useModalContext deve ser usado dentro de um ModalContext.Provider")
    }
    return provider
}