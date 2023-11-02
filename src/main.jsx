import React from "react"
import ReactDOM from "react-dom/client"
import { AppRoutes } from "./routes/AppRoutes"
import { GlobalStyle } from "./global.style"
import { SidebarProvider } from "./contexts/SidebarContext"
import { AuthProvider } from "./contexts/Auth/Auth.context"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from "./contexts/Modal.context"


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalStyle />
		<SidebarProvider>
			<AuthProvider>
				<ToastContainer/>
			  <ModalProvider>
				  <AppRoutes />
			  </ModalProvider>
    </AuthProvider>
		</SidebarProvider>
	</React.StrictMode>
)
