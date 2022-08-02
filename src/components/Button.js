import React from "react";
import styled from "styled-components";

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  padding: 10px;
  background-color: #6d8fad;
  color: #fff;
  border-radius: 10px;
`;

export default Button;
