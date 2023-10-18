import { useState } from "react"
import * as Styled from "./sidebar.style"
import {
	TbLayoutSidebarLeftCollapse,
	TbLayoutSidebarLeftExpand,
	TbLogout,
} from "react-icons/tb"

export default function SidebarComponent() {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<Styled.Sidebar isOpen>
			<Styled.Header>
				<div
					style={{ width: "100%", display: "flex", justifyContent: "end" }}
				>
					<button onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? (
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
					<ul>
                        <li>
                            <input type="radio" name="selector" id="home" />
                            <label htmlFor="home">Home</label>
                        </li>
                        <li>
                            <input type="radio" name="selector" id="cadPaciente" />
                            <label htmlFor="cadPaciente">Cad. Paciente</label>
                        </li>
                        <li>
                            <input type="radio" name="selector" id="cadEnfermeiro" />
                            <label htmlFor="cadEnfermeiro">Cad. Enfermeiro</label>
                        </li>
                    </ul>
				</Styled.ListGroup>
			</Styled.Body>
			<Styled.Footer>
				<button>
					<TbLogout size={"1.5rem"} />
				</button>
			</Styled.Footer>
		</Styled.Sidebar>
	)
}
