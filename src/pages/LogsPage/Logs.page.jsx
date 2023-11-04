import { useEffect, useState } from "react";
import * as Styled from "./Logs.style";
import { useToolbarContext } from "../../hooks/useToolbarContext";
import { Api } from "../../services/api";

export const LogsPage = () => {
    const { setTitulo } = useToolbarContext();
    const token = localStorage.getItem("@Auth:token");
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        setTitulo("Página de Logs");
        fetchLogs();
    }, []);

    const fetchLogs = () => {
        Api.get("/logs", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setLogs(response.data);
                console.log(logs);
            })
            .catch(error => {
                console.error('Erro ao buscar logs: ', error);
            });
    };

    return (
        <Styled.LogsContainer>
            <Styled.Card>
                {logs.map(log => (
                    <Styled.TitulosListaCardBox key={log.id}>
                        <Styled.CardContent>{log.id}</Styled.CardContent>
                        <Styled.CardContent>{log.registro}</Styled.CardContent>
                        <Styled.CardContent>{log.dataHora}</Styled.CardContent>
                    </Styled.TitulosListaCardBox>
                ))}
            </Styled.Card>
        </Styled.LogsContainer>
    );
};
