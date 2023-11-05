import { useContext, useEffect } from "react"
import * as Styled from "./sidebar.style"
import { useNavigate, useLocation } from "react-router-dom"
import { SidebarContext } from "../../contexts/SidebarContext"

// Imagem de icones
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
	TbHome,
	TbPill,
	TbTestPipe
} from "react-icons/tb"
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6"
import { MdOutlineSick } from "react-icons/md"
import { GiKnifeFork } from 'react-icons/gi'

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
			case "/cadastrapaciente":
				document.getElementById("paciente").checked = true
				break
			case "/cadastradieta":
				document.getElementById("dieta").checked = true
				break
			case "/exames":
				document.getElementById("exames").checked = true
				break
			case "/cadmedicamento":
				document.getElementById("medicamento").checked = true
				break
			default:
				console.log("Pagina desconhecida")
				break
		}
	}, [location])

	// FUNCTIONS
	const logout = async () => {
		// deslogar e apagar token no localStorage
		// após logout redirecionar para a página de login
		// navigate('/login')
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
						<Styled.Li onClick={() => navigate('/exames')}>
							<input type="radio" name="page" id="exames" />
							<TbTestPipe size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="exames"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Exames
							</label>
						</Styled.Li>
						<Styled.Li >
							<input type="radio" name="page" id="medico" />
							<FaUserDoctor size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="medico"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Medicos
							</label>
						</Styled.Li>
						<Styled.Li >
							<input type="radio" name="page" id="enfermeiro" />
							<FaUserNurse size={showSidebar ? "" : "1.5rem"} />
							<label
								htmlFor="enfermeiro"
								className={showSidebar ? "" : "tooltiptext"}
							>
								Enfermeiros
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
