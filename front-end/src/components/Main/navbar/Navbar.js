import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";

const Nabar = () => {
  const auth = JSON.parse(localStorage.getItem("student"));
  const authh = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate;

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <>
      {auth || authh ? (
        <>
          <Navbar expand="lg" style={{ backgroundColor: "teal" }}>
            <MDBContainer
              style={{ justifyContent: "left", paddingLeft: "60px" }}
            >
              <img src="/AMULOGO2.png" alt="img" style={{ height: "60px" }} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h2 style={{ color: "white" }}>TPO ZHCET</h2>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <h1>
                  <i className="fa-sharp fa-solid fa-bars" />
                </h1>
              </Navbar.Toggle>
            </MDBContainer>
            <Navbar.Collapse id="basic-navbar-nav">
              <MDBContainer>
                <Nav className="mr-auto text-center">
                  <Nav.Link href="/" style={{ color: "white" }}>
                    &nbsp;&nbsp;Home
                  </Nav.Link>
                  {auth ? (
                    <Nav.Link
                      href="/student/dashboard"
                      style={{ color: "white" }}
                    >
                      {auth.firstName}
                    </Nav.Link>
                  ) : null}
                  {authh ? (
                    authh.role === "recruiter" ? (
                      <Nav.Link
                        href="/recruiter/dashboard"
                        style={{ color: "white" }}
                      >
                        {authh.username}
                      </Nav.Link>
                    ) : (
                      <Nav.Link
                        href="/admin/manageadmin"
                        style={{ color: "white" }}
                      >
                        {authh.username}
                      </Nav.Link>
                    )
                  ) : null}

                  <Nav.Link
                    href="/register"
                    style={{ color: "white", textDecoration: "none" }}
                    onClick={() => logout()}
                  >
                    &nbsp;&nbsp;Logout
                  </Nav.Link>
                </Nav>
              </MDBContainer>
            </Navbar.Collapse>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar expand="lg" style={{ backgroundColor: "teal" }}>
            <MDBContainer
              style={{ justifyContent: "left", paddingLeft: "60px" }}
            >
              <img src="./AMULOGO2.png" alt="img" style={{ height: "60px" }} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h2 style={{ color: "white" }}>TPO ZHCET</h2>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <h1>
                  <i className="fa-sharp fa-solid fa-bars" />
                </h1>
              </Navbar.Toggle>
            </MDBContainer>
            <Navbar.Collapse id="basic-navbar-nav">
              <MDBContainer>
                <Nav className="mr-auto text-center">
                  <Nav.Link href="/" style={{ color: "white" }}>
                    &nbsp;&nbsp;Home
                  </Nav.Link>
                  <Nav.Link href="/register" style={{ color: "white" }}>
                    &nbsp;&nbsp;Register
                  </Nav.Link>
                  <Nav.Link href="/login" style={{ color: "white" }}>
                    &nbsp;&nbsp;Login
                  </Nav.Link>
                </Nav>
              </MDBContainer>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
};

export default Nabar;
