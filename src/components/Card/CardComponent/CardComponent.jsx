import React from "react";
import * as Styled from "./Card.style";

const CardComponent = ({ title, value, icon, color }) => {
  return (
    <Styled.CardWrapper color={color}>
      <Styled.IconWrapper>{icon}</Styled.IconWrapper>
      <Styled.Value>{value}</Styled.Value>
      <Styled.Title>{title}</Styled.Title>
    </Styled.CardWrapper>
  );
};

export default CardComponent;

