import { useContext, useEffect, useState } from "react"
import * as Styled from "./sidebar.style"
import { useNavigate, useLocation } from "react-router-dom"
import { SidebarContext } from "../../contexts/SidebarContext"

// Imagem de icones
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
	TbUserCircle,
	TbHome,
} from "react-icons/tb"
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6"
import { MdOutlineSick } from "react-icons/md"

// Imagem de Logo
import logoP from "../../assets/images/logoG.png"

export default function SidebarComponent() {
	// CONTEXTS
	const { showSidebar, setShowSidebar } = useContext(SidebarContext)

	// REACT-ROUTER-DOM
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				document.getElementById("home").checked = true
				break
			default:
				console.log("Pagina diferente de /")
				break
		}
	}, [location])

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
				<img
					src={logoP}
					width={showSidebar ? "120px" : "50px"}
					style={{ margin: "2rem 0" }}
				/>
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
				<Styled.TooltipContainer
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<Styled.SidebarBtn>
						<span className={showSidebar ? "" : "tooltiptext"}>
							{showSidebar ? "Retrair" : "Expandir"}
						</span>
						{showSidebar ? (
							<TbLayoutSidebarLeftCollapse size={"1.5rem"} />
						) : (
							<TbLayoutSidebarLeftExpand size={"1.5rem"} />
						)}
					</Styled.SidebarBtn>
				</Styled.TooltipContainer>

				<Styled.TooltipContainer onClick={logout} $isOpened={showSidebar}>
					<Styled.SidebarBtn>
						<span className={showSidebar ? "" : "tooltiptext"}>
							Logout
						</span>
						<TbLogout size={"1.5rem"} />
					</Styled.SidebarBtn>
				</Styled.TooltipContainer>
			</Styled.Footer>
		</Styled.Sidebar>
	)
} 
