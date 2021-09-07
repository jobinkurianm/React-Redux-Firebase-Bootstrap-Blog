import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ logoutUser }) => {
  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    
    <nav className="navbar navbar-expand-lg px-0 py-3 navbar-dark bg-dark shadow">
      <div className="container">
      <Link to="/admin/dashboard/" className="navbar-brand ml-5">
        Admin Dashboard
      </Link>
      <ul className="navbar-nav">
         {/*<li className="nav-item">
          <NavLink exact to="/admin/login" className="nav-link">
            Login
          </NavLink>
        </li>*/}
        <li className="nav-item">
          <NavLink exact to="/admin/dashboard/addPost" className="nav-link">
            Add Post
          </NavLink>
        </li>
      </ul>

      {isLoggedIn && (
        <div className="profile text-white font-weight-bold ml-auto">
          Welcome Admin,{" "}
          <span className="text-warning">{user.displayName}</span>
          <button className="btn btn-primary ml-3" onClick={() => logoutUser()}>
            Logout
          </button>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
