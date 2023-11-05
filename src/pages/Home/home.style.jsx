import styled from "styled-components";
import { COLOR } from "../../assets/styles/colors";

export const Dasboard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  color: COLOR.$white_lightest;
  padding-bottom: 3rem;
`;

export const Title = styled.h3`
  font-size: 2.5rem;
  color: COLOR.$black_lightest;
  margin-bottom: 2rem;
  padding-top: 3rem;
  text-align: center;
`;
export const Container = styled.div`
  width: 90%;
  margin: auto;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 90%;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
`;
