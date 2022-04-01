import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    navigate("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{padding:"0 2rem"}}>
        <span className="brand-logo">
          Links
        </span>
        <ul id="nav-mobile" className="right ">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <NavLink to="/links" />
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
