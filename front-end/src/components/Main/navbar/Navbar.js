import React from "react";
import "./Navbar.css";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("student"));
  const authh = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate;

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div>
      {auth || authh ? (
        <nav className="navbar">
          <Container>
            <div className="logo">
              Training & Placement Cell
              <p>ZHCET AMU</p>
            </div>
            <ul className="nav-links">
              <input type="checkbox" id="checkbox_toggle" />
              <label htmlFor="checkbox_toggle" className="hamburger">
                &#9776;
              </label>
              <div className="menu">
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                {auth ? (
                  <li>
                    <Link
                      to="/student/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="fa-solid fa-user"></i> {auth.firstName}
                    </Link>
                  </li>
                ) : null}
                {authh ? (
                  authh.role === "recruiter" ? (
                    <li>
                      <Link to="/recruiter/dashboard" style={{ textDecoration: "none" }}>
                        <i className="fa-solid fa-user"></i> {authh.username}
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/admin/manageadmin" style={{ textDecoration: "none" }}>
                        <i className="fa-solid fa-user"></i> {authh.username}
                      </Link>
                    </li>
                  )
                ) : null}
                <li>
                  <Link
                    onClick={() => logout()}
                    style={{ textDecoration: "none" }}
                    to="/register"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </ul>
          </Container>
        </nav>
      ) : (
        <nav className="navbar">
          <Container>
            <div className="logo">Training & Placement Cell</div>
            <ul className="nav-links">
              <input type="checkbox" id="checkbox_toggle" />
              <label htmlFor="checkbox_toggle" className="hamburger">
                &#9776;
              </label>
              <div className="menu">
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </li>
              </div>
            </ul>
          </Container>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
