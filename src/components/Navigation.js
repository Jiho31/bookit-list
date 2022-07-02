import { authService } from "fbase";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <nav>
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
    </nav>
  );
}

export default Navigation;
