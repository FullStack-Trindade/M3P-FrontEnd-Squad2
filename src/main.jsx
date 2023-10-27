import React from "react"
import ReactDOM from "react-dom/client"
import { AppRoutes } from "./routes/AppRoutes"
import { GlobalStyle } from "./global.style"
import { SidebarProvider } from "./contexts/SidebarContext"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<GlobalStyle />
		<SidebarProvider>
			<AppRoutes />
		</SidebarProvider>
	</React.StrictMode>
)
