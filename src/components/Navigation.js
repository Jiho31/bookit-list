import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Button from "./Button";

function Navigation() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const onClickHandler = () => {
    authService.signOut();
    navigate("/");
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setActiveTab(1);
        break;
      case "/library":
        setActiveTab(2);
        break;
      case "/notes":
        setActiveTab(3);
        break;
      default:
        setActiveTab(1);
    }
  });

  return (
    <StyledNav>
      <ul>
        <li>
          <span>
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo icon" />
          </span>
        </li>
        <li className={activeTab === 1 ? "active" : ""}>
          <Link to="/">
            <Icon icon="bx:search-alt-2" />
            Search
          </Link>
        </li>
        <li className={activeTab === 2 ? "active" : ""}>
          <Link to="/library">
            <Icon icon="mdi:bookshelf" />
            Library
          </Link>
        </li>
        <li className={activeTab === 3 ? "active" : ""}>
          <Link to="/notes">
            <Icon icon="fa-solid:pen" />
            Notes
          </Link>
        </li>
        <li>
          <Button onClick={onClickHandler}>Logout</Button>
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
    height: auto;
    font-size: 20px;
  }
  li:first-child {
    height: auto;
  }
  .active a {
    color: #233142;
    font-weight: 500;
  }
  img {
    width: 130px;
    height: auto;
  }
  a {
    line-height: 20px;
    color: #6d8fad;
    display: inline-flex;

    svg {
      margin-right: 8px;
    }
  }
`;

export default React.memo(Navigation);
