import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand color nav-logo"
          to="/"
          style={{ fontFamily: "Rubik", fontSize: "24px", fontWeight: "600" }}
        >
          Scribble
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/allEntries">
                All Entries
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <form className="mx-3">
        {localStorage.getItem("authToken") ? (
          <Link
            className="btn btn-success mx-1"
            to="/login"
            role="button"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          ""
        )}
      </form>
    </nav>
  );
}

export default NavBar;
