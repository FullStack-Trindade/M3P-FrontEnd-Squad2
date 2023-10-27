import { useContext, useState } from "react"
import * as Styled from "./sidebar.style"
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
	TbUserCircle,
	TbHome,
} from "react-icons/tb"

import { FaUserDoctor, FaUserNurse } from "react-icons/fa6"
import { MdOutlineSick } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { SidebarContext } from "../../contexts/SidebarContext"

export default function SidebarComponent() {
	// CONTEXTS
	const { showSidebar, setShowSidebar } = useContext(SidebarContext)

	// REACT-ROUTER-DOM
	const navigate = useNavigate()

	// FUNCTIONS
	const logout = async () => {
		// deslogar e apagar token no localStorage
		// após logout redirecionar para a página de login
		// navigate('/login')
	}

	const check = (e) => {
		// marca o 1º filho (input) como checked
		e.target.firstChild.checked = true
	}

	return (
		<Styled.Sidebar show={showSidebar} $isOpened={showSidebar}>
			<Styled.Header>
				<Styled.TooltipContainer>
					<span className={showSidebar ? "" : "tooltiptext"}>
						{showSidebar ? "Retrair" : "Expandir"}
					</span>
					<button onClick={() => setShowSidebar(!showSidebar)}>
						{showSidebar ? (
							<TbLayoutSidebarLeftCollapse size={"1.5rem"} />
						) : (
							<TbLayoutSidebarLeftExpand size={"1.5rem"} />
						)}
					</button>
				</Styled.TooltipContainer>
				<h2>Brand</h2>
			</Styled.Header>
			<Styled.Body>
				<Styled.ListGroup>
					<p style={{ display: showSidebar ? "" : "none" }}>Páginas</p>

					<ul>
						<Styled.Li onClick={check}>
							<input type="radio" name="page" id="home" value="Home" />
							<TbHome size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="home"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Home
							</label>
						</Styled.Li>
						<Styled.Li onClick={check}>
							<input type="radio" name="page" id="cadMedico" />
							<FaUserDoctor size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="cadMedico"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Cad. Medico
							</label>
						</Styled.Li>
						<Styled.Li onClick={check}>
							<input type="radio" name="page" id="cadEnfermeiro" />
							<FaUserNurse size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="cadEnfermeiro"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Cad. Enfermeiro
							</label>
						</Styled.Li>
						<Styled.Li onClick={check}> 
							<input type="radio" name="page" id="cadPaciente" />
							<MdOutlineSick size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="cadPaciente"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Cad. Paciente
							</label>
						</Styled.Li>
					</ul>
				</Styled.ListGroup>
			</Styled.Body>
			<Styled.Footer>
				<Styled.TooltipContainer $isOpened={showSidebar} style={{marginBottom: '1rem'}}>
					<TbUserCircle size={"2.5rem"} />
					<span className={showSidebar ? "" : "tooltiptext"}>
						Username
					</span>
				</Styled.TooltipContainer>

				<Styled.TooltipContainer onClick={logout} $isOpened={showSidebar}>
					<span className={showSidebar ? "" : "tooltiptext"}>
						Logout
					</span>
					<TbLogout size={"1.5rem"} />
				</Styled.TooltipContainer>
			</Styled.Footer>
		</Styled.Sidebar>
	)
} 
