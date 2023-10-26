import { useContext } from "react";
import { ToolbarTituloContext } from "../contexts/ToolbarTitulo/ToolbarTitulo.context";

export const useToolbarContext = () => {
	const provider = useContext(ToolbarTituloContext);

	if (!provider) {
		throw new Error(
			"useToolbarContext deve ser usado dentro de um ToolbarProvider"
		);
	}
	return provider;
};
