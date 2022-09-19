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
      case "/memos":
        setActiveTab(3);
        break;
      default:
        const queries = window.location.pathname.split("/");
        if (queries.length === 4 && queries[1] === "library") {
          setActiveTab(2);
          break;
        }
        setActiveTab(1);
    }
  });

  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/">
            <span>
              <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo icon" />
            </span>
          </Link>
        </li>
        <li className={activeTab === 1 ? "active" : ""}>
          <Link to="/">
            <Icon icon="bx:search-alt-2" />
            도서 검색
          </Link>
        </li>
        <li className={activeTab === 2 ? "active" : ""}>
          <Link to="/library">
            <Icon icon="mdi:bookshelf" />
            책꽂이
          </Link>
        </li>
        <li className={activeTab === 3 ? "active" : ""}>
          <Link to="/memos">
            <Icon icon="fa-solid:pen" />
            메모
          </Link>
        </li>
        <li>
          <Button aria-label="로그아웃" onClick={onClickHandler}>
            로그아웃
          </Button>
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
    font-size: 18px;
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
