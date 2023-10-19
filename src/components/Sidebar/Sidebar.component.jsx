import { useContext, useState } from "react"
import * as Styled from "./sidebar.style"
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
	TbUserCircle,
	TbHome,
} from "react-icons/tb"

import { FaUserDoctor, FaUserNurse } from 'react-icons/fa6'
import { MdOutlineSick } from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import { SidebarContext } from "../../contexts/SidebarContext"

export default function SidebarComponent() {

	// CONTEXTS
	const { showSidebar, setShowSidebar} = useContext(SidebarContext)

	// REACT-ROUTER-DOM
	const navigate = useNavigate()

	// FUNCTIONS
	const logout = async () => {
		// deslogar e apagar token no localStorage

		// após logout redirecionar para a página de login
		// navigate('/login')
	}

	const check = (e) => {
		console.log(e.target.id)
	}

	return (
		<Styled.Sidebar show={showSidebar} $isOpened={showSidebar}>
			<Styled.Header>
				<div
					style={{ width: "100%", display: "flex", justifyContent: "end" }}
				>
					<button onClick={() => setShowSidebar(!showSidebar)}>
						{showSidebar ? (
							<TbLayoutSidebarLeftCollapse size={"1.5rem"} />
						) : (
							<TbLayoutSidebarLeftExpand size={"1.5rem"} />
						)}
					</button>
				</div>
				<h2>Brand</h2>
			</Styled.Header>
			<Styled.Body>
				<Styled.ListGroup>
					<p style={{display: showSidebar ? "" : "none"}}>Páginas</p>

					<ul>
                        <li>
                            <input type="radio" name="selector" id="home" />
							<TbHome size={showSidebar ? "" : "1.5rem"} />
                            <label htmlFor="home" style={{display: showSidebar ? "" : "none"}}>Home</label>
                        </li>
                        <li>
                            <input type="radio" name="selector" id="cadMedico" />
							<FaUserDoctor size={showSidebar ? "" : "1.5rem"} />
                            <label htmlFor="cadMedico" style={{display: showSidebar ? "" : "none"}}>Cad. Medico</label>
                        </li>
						<li>
                            <input type="radio" name="selector" id="cadEnfermeiro" />
							<FaUserNurse size={showSidebar ? "" : "1.5rem"} />
                            <label htmlFor="cadEnfermeiro" style={{display: showSidebar ? "" : "none"}}>Cad. Enfermeiro</label>
                        </li>
                        <li>
                            <input type="radio" name="selector" id="cadPaciente" />
							<MdOutlineSick size={showSidebar ? "" : "1.5rem"} />
                            <label htmlFor="cadPaciente" style={{display: showSidebar ? "" : "none"}}>Cad. Paciente</label>
                        </li>                        
                    </ul>
				</Styled.ListGroup>
			</Styled.Body>
			<Styled.Footer>
				<Styled.UserContainer $isOpened={showSidebar}>
					<TbUserCircle size={"1.5rem"}/>
					<span>Username</span>
				</Styled.UserContainer>

				<Styled.LogoutBtn onClick={logout} $isOpened={showSidebar}>
					<TbLogout size={"1.5rem"} />
				</Styled.LogoutBtn>
			</Styled.Footer>
		</Styled.Sidebar>
	)
}
