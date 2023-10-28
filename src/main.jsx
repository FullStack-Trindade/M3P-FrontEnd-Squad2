import React from "react"
import ReactDOM from "react-dom/client"
import { AppRoutes } from "./routes/AppRoutes"
import { GlobalStyle } from "./global.style"
import { SidebarProvider } from "./contexts/SidebarContext"
import { ModalProvider } from "./contexts/Modal.context"
//
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalStyle />
		<SidebarProvider>
			<ModalProvider>
				<AppRoutes />
			</ModalProvider>
		</SidebarProvider>
	</React.StrictMode>
)
