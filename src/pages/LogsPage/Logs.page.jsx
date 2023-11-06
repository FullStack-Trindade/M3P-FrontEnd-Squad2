import { useEffect, useState } from "react";
import * as Styled from "./Logs.style";
import { useToolbarContext } from "../../hooks/useToolbarContext";
import { Api } from "../../services/api";

export const LogsPage = () => {
    const { setTitulo } = useToolbarContext();
    const token = localStorage.getItem("@Auth:token");
    const [logs, setLogs] = useState([]);
    const formataData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }
    const formataHora = (data) => {
        return new Date(data).toLocaleTimeString().slice(0, 8);
    }
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

    const renderCardsLogs = () => {
        return logs.map((log) => (
            <Styled.Card key={log.id}>
                <Styled.CardContent>
                    <Styled.CardTitulo>{log.id}</Styled.CardTitulo>
                    <Styled.CardTitulo>{log.registro}</Styled.CardTitulo>
                    <Styled.CardTitulo>{`${formataData(log.dataHora)} às ${formataHora(log.dataHora)}`}</Styled.CardTitulo>
                </Styled.CardContent>
            </Styled.Card>
        ));
    }

    return (
        <Styled.LogsContainer>
            <Styled.CardBox>
                <Styled.TitulosListaCardBox>
                    <h3>ID</h3>
                    <h3>Registro</h3>
                    <h3>Data/Hora</h3>
                </Styled.TitulosListaCardBox>
                {renderCardsLogs()}
            </Styled.CardBox>
        </Styled.LogsContainer>
    );
};
