import { useContext, useEffect } from "react"
import * as Styled from "./sidebar.style"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { SidebarContext } from "../../contexts/SidebarContext"

// Imagem de icones
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
	TbHome,
	TbPill,
	TbTestPipe,
	TbUsersPlus,
	TbClipboardText
} from "react-icons/tb"
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6"
import { MdOutlineSick, MdOutlineBuild } from "react-icons/md"
import { GiKnifeFork } from 'react-icons/gi'

// Imagem de Logo
import logoP from "../../assets/images/logoG.png"
import { useAuth } from "../../hooks/useAuth"

export default function SidebarComponent() {
	// CONTEXTS
	const { showSidebar, setShowSidebar } = useContext(SidebarContext)
	const { usuario, logout } = useAuth()
	// REACT-ROUTER-DOM
	const navigate = useNavigate()
	const location = useLocation()
	const { id } = useParams()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				document.getElementById("home").checked = true
				break
			case "/cadastrapaciente":
				document.getElementById("paciente").checked = true
				break
			case `/editapaciente/${id}`:
				document.getElementById("paciente").checked = true
				break
			case "/cadastradieta":
				document.getElementById("dieta").checked = true
				break
			case `/editadieta/${id}`:
				document.getElementById("dieta").checked = true
				break
			case "/cadastraexame":
				document.getElementById("exames").checked = true
				break
			case `/editaexame/${id}`:
				document.getElementById("exames").checked = true
				break
			case "/cadmedicamento":
				document.getElementById("medicamento").checked = true
				break
			case "/config":
				document.getElementById("config").checked = true
				break
			case "/cadastrausuarios":
				document.getElementById("usuario").checked = true
				break
			case `/editausuario/${id}`:
				document.getElementById("usuario").checked = true
				break
			case "/logs":
				document.getElementById("logs").checked = true
				break
			default:
				console.log("Pagina desconhecida")
				break
		}
	}, [location])

	// FUNCTIONS
	const handleSair = async () => {
		logout();
		navigate('/login')
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
						<Styled.Li onClick={() => navigate('/')}>
							<input type="radio" name="page" id="home" value="home" />
							<TbHome size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="home"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Home
							</label>
						</Styled.Li>
						<Styled.Li onClick={() => navigate('/cadastrapaciente')}>
							<input type="radio" name="page" id="paciente" />
							<MdOutlineSick size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="paciente"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Paciente
							</label>
						</Styled.Li>
						<Styled.Li onClick={() => navigate('/cadastradieta')}>
							<input type="radio" name="page" id="dieta" />
							<GiKnifeFork size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="dieta"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Dieta
							</label>
						</Styled.Li>
						<Styled.Li onClick={() => navigate('/cadastraexame')}>
							<input type="radio" name="page" id="exames" />
							<TbTestPipe size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="exames"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Exames
							</label>
						</Styled.Li>

						<Styled.Li onClick={() => navigate('/cadmedicamento')}>
							<input type="radio" name="page" id="medicamento" />
							<TbPill size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="medicamento"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Medicamentos
							</label>
						</Styled.Li>
					</ul>
				</Styled.ListGroup>
				{usuario.tipo === "ADMINISTRADOR" &&
					<Styled.ListGroup>
						<p style={{ display: showSidebar ? "" : "none" }}>Admin</p>

						<ul>
							<Styled.Li onClick={() => navigate('/config')}>
								<input type="radio" name="page" id="config" value="config" />
								<MdOutlineBuild size={showSidebar ? "" : "1.5rem"} />
								<label
									htmlFor="config"
									className={showSidebar ? "" : "tooltiptext"}
								>
									Configurações
								</label>
							</Styled.Li>
							<Styled.Li onClick={() => navigate('/cadastrausuarios')}>
								<input type="radio" name="page" id="usuario" />
								<TbUsersPlus size={showSidebar ? "" : "1.5rem"} />
								<label
									htmlFor="usuario"
									className={showSidebar ? "" : "tooltiptext"}
								>
									Usuário
								</label>
							</Styled.Li>
							<Styled.Li onClick={() => navigate('/logs')}>
								<input type="radio" name="page" id="logs" />
								<TbClipboardText size={showSidebar ? "" : "1.5rem"} />
								<label
									htmlFor="logs"
									className={showSidebar ? "" : "tooltiptext"}
								>
									Logs
								</label>
							</Styled.Li>
						</ul>
					</Styled.ListGroup>}
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

				<Styled.TooltipContainer onClick={handleSair} $isOpened={showSidebar}>
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
