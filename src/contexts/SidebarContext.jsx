import { createContext, useState } from "react"

export const SidebarContext = createContext({
    showSidebar: true,
    setShowSidebar: () => {},
    isOpened: true,
    setIsOpened: () => {}
})

export const SidebarProvider = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (
        <SidebarContext.Provider value={{showSidebar, setShowSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}