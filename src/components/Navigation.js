import { authService } from "fbase";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Navigation() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library">My Library</Link>
        </li>
        <li>
          <button onClick={onClickHandler}>Logout</button>
        </li>
      </ul>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  ul {
    display: flex;
    justify-content: space-evenly;
    padding: 15px 0;
  }
  li {
    font-size: 22px;
    padding: 5px;
  }
`;

export default Navigation;
