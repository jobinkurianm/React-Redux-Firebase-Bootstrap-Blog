import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="container">
    <nav className="navbar px-0 navbar-expand-lg py-3">
    <div className="col-4 pl-0">
      <Link to="/" className="navbar-brand text-muted">
        Demo Project: Jobin Kurian
      </Link>
      </div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link text-muted">
            Home
          </NavLink>
        </li>
        {(!isLoggedIn ? 
          <li className="nav-item">
          <NavLink exact to="/admin/login" className="nav-link text-muted">
          Login/Register
          </NavLink>
          </li>
        : 
        null)}

      </ul>
    </nav></div>
  );
};

export default Navbar;
