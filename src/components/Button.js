import React from "react";
import styled from "styled-components";

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: 10px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#6d8fad"};
  color: ${(props) => (props.color ? props.color : "#fff")};
  border-radius: 10px;
`;

export default Button;
