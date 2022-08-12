import { authService } from "fbase";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

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
          <span>
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo icon" />
          </span>
        </li>
        <li>
          <Link to="/">
            <Icon icon="bx:search-alt-2" />
            Search
          </Link>
        </li>
        <li>
          <Link to="/library">
            <Icon icon="mdi:bookshelf" />
            Library
          </Link>
        </li>
        <li>
          <Link to="/notes">
            <Icon icon="fa-solid:pen" />
            Notes
          </Link>
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
    align-items: center;
    padding: 15px 0;
  }
  li {
    height: 28px;
    font-size: 22px;
    font-weight: 500;
  }
  li:first-child {
    height: auto;
  }
  img {
    width: 130px;
    height: auto;
  }
  a {
    line-height: 22px;
    color: #6d8fad;
    display: inline-flex;
    /* align-items: center; */

    svg {
      margin-right: 8px;
    }
  }
`;

export default Navigation;
