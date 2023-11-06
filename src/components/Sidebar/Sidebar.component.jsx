import { useContext, useEffect } from "react";
import * as Styled from "./sidebar.style";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";

// Imagem de icones
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbLogout,
  TbHome,
  TbPill,
  TbTestPipe,
  TbUsersPlus,
  TbClipboardText,
} from "react-icons/tb";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { MdOutlineSick, MdOutlineBuild } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";

// Imagem de Logo
import logoP from "../../assets/images/logoG.png";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarComponent() {
  // CONTEXTS
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  const { usuario, logout } = useAuth();
  // REACT-ROUTER-DOM
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.getElementById("home").checked = true;
        break;
      case "/cadastrapaciente":
      case `/editapaciente/${id}`:
        document.getElementById("paciente").checked = true;
        break;
      case "/cadastradieta":
      case `/editadieta/${id}`:
        document.getElementById("dieta").checked = true;
        break;
      case "/cadastraexame":
      case `/editaexame/${id}`:
        document.getElementById("exames").checked = true;
        break;
      case "/medicamento":
      case `/medicamento/${id}`:
        document.getElementById("medicamento").checked = true;
        break;
      case "/consultas": // Adicione a rota "Consultas"
        document.getElementById("consultas").checked = true;
        break;
      case "/exercicios": // Adicione a rota "Exercícios"
        document.getElementById("exercicios").checked = true;
        break;
      case "/listaprontuarios": // Adicione a rota "Prontuários"
        document.getElementById("prontuarios").checked = true;
        break;
      case "/config":
        document.getElementById("config").checked = true;
        break;
      case "/cadastrausuarios":
      case `/editausuario/${id}`:
        document.getElementById("usuario").checked = true;
        break;
      case "/logs":
        document.getElementById("logs").checked = true;
        break;
      default:
        console.log("Página desconhecida");
        break;
    }
  }, [location]);

  // FUNCTIONS
  const handleSair = async () => {
    logout();
    navigate("/login");
  };

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
            <Styled.Li onClick={() => navigate("/")}>
              <input type="radio" name="page" id="home" value="home" />
              <TbHome size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="home"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Home
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/cadastrapaciente")}>
              <input type="radio" name="page" id="paciente" />
              <MdOutlineSick size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="paciente"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Paciente
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/cadastradieta")}>
              <input type="radio" name="page" id="dieta" />
              <GiKnifeFork size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="dieta"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Dieta
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/cadastraexame")}>
              <input type="radio" name="page" id="exames" />
              <TbTestPipe size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="exames"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Exames
              </label>
            </Styled.Li>

            <Styled.Li onClick={() => navigate("/medicamento")}>
              <input type="radio" name="page" id="medicamento" />
              <TbPill size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="medicamento"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Medicamentos
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/consultas")}>
              {" "}
              {/* Adicione a página "Consultas" */}
              <input
                type="radio"
                name="page"
                id="consultas"
                value="consultas"
              />
              <FaUserDoctor size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="consultas"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Consultas
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/exercicios")}>
              {" "}
              {/* Adicione a página "Exercícios" */}
              <input type="radio" name="page" id="exercicios" />
              <GiKnifeFork size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="exercicios"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Exercícios
              </label>
            </Styled.Li>
            <Styled.Li onClick={() => navigate("/listaprontuarios")}>
              {" "}
              {/* Adicione a página "Prontuários" */}
              <input type="radio" name="page" id="prontuarios" />
              <TbPill size={showSidebar ? "" : "1.5rem"} />
              <label
                htmlFor="prontuarios"
                className={showSidebar ? "" : "tooltiptext"}
              >
                Prontuários
              </label>
            </Styled.Li>
          </ul>
        </Styled.ListGroup>
        {usuario.tipo === "ADMINISTRADOR" && (
          <Styled.ListGroup>
            <p style={{ display: showSidebar ? "" : "none" }}>Admin</p>

            <ul>
              <Styled.Li onClick={() => navigate("/config")}>
                <input type="radio" name="page" id="config" value="config" />
                <MdOutlineBuild size={showSidebar ? "" : "1.5rem"} />
                <label
                  htmlFor="config"
                  className={showSidebar ? "" : "tooltiptext"}
                >
                  Configurações
                </label>
              </Styled.Li>
              <Styled.Li onClick={() => navigate("/cadastrausuarios")}>
                <input type="radio" name="page" id="usuario" />
                <TbUsersPlus size={showSidebar ? "" : "1.5rem"} />
                <label
                  htmlFor="usuario"
                  className={showSidebar ? "" : "tooltiptext"}
                >
                  Usuário
                </label>
              </Styled.Li>
              <Styled.Li onClick={() => navigate("/logs")}>
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
          </Styled.ListGroup>
        )}
      </Styled.Body>
      <Styled.Footer>
        <Styled.TooltipContainer onClick={() => setShowSidebar(!showSidebar)}>
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
            <span className={showSidebar ? "" : "tooltiptext"}>Logout</span>
            <TbLogout size={"1.5rem"} />
          </Styled.SidebarBtn>
        </Styled.TooltipContainer>
      </Styled.Footer>
    </Styled.Sidebar>
  );
}
