import styled from "styled-components";
import { Card,  Container} from "react-bootstrap";

export const PageWrapper = styled.div`
  background-color: #f6f8fb;
  width: 100%;
`;

export const PageContainer = styled(Container)`
  margin-bottom: 20px;
  width: 85%;
  padding-top: 5rem;
`;

export const PatientCard = styled(Card)`
  margin-bottom: 20px;
  border: none;
  color: #145979;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ItemCard = styled(Card)`
  margin-bottom: 20px;
  color: ${(props) => (props.type === "consulta" ? "#116b66" : "#16587b")};
  font-weight: 500;
  border: none;
  background-color: ${(props) =>
    props.type === "consulta" ? "#16989112" : "#1a689220"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled(Card.Title)`
  margin-bottom: 0;
  font-size: 1.7rem;
  color: #145979;
  padding-top:12px;
  padding: 12px -12px;

`;

export const CardContent = styled(Card.Body)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #549abb;
  margin-bottom: 1rem;
  padding: 0%.5rem;
`;

export const PatientName = styled.h2`
  padding-left: 1rem;
  margin-top: 1rem;
`;

export const PatientDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PatientData = styled.div`
  flex: 1;
  padding-left: 1rem;
`;

export const PatientDataLabel = styled.p`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const DetailDataLabel = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4a666d;
`;

export const StyledButton = styled.button`
  background-color: #f0a50ee2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f0a50e;
  }
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ConsultNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ecb511;
  color: #fff;
  padding: 16px 22px;
  border-radius: 12%;
  margin-right: 10px;
  z-index: 1; 
  position: relative;
`;

export const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DateTime = styled.div`
  font-size: 1.1rem;
  color: #4a666d;
  margin-bottom: 10px;
`;