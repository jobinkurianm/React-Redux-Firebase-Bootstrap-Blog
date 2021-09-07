import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SubNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="container">

    <header className="blog-header py-3">
    <div className="row flex-nowrap justify-content-between align-items-center">
      <div className="col-4 text-center">
        <a className="blog-header-logo text-dark" href="#"></a>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
      <p className="font-weight-bold small ml-auto mt-3">
        Welcome Admin, <span className="text-primary">{user.displayName}</span>
      </p>
      <Link to="/admin" className="btn btn-success btn-sm h-50 ml-2">
        Admin
      </Link>

      </div>
    </div>
  </header>


  
  </div>
  );
};

export default SubNavbar;
