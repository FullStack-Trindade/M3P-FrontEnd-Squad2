import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ToolbarTituloContext = createContext({
	titulo: "Titulo página",
	setTitulo: () => {},
});

export const ToolbarTituloProvider = ({ children }) => {
	const [titulo, setTitulo] = useState("Titulo Página");

	return (
		<ToolbarTituloContext.Provider value={{ titulo, setTitulo }}>
			{children}
		</ToolbarTituloContext.Provider>
	);
};

ToolbarTituloProvider.propTypes = {
	children: PropTypes.node,
};
