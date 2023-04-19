import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Outlet, useNavigate } from "react-router-dom";
import Nabvar from "../../Main/navbar/Navbar";
import { Nav, Navbar } from "react-bootstrap";
import Footer from "../../Main/footer/footer";
const Recruiter = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const identity = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate();
  const [recruiterId, setId] = useState("");
  useEffect(() => {
    if (!authorize || !identity) {
      navigate("/");
    } else {
      const revealIdentity = identity.role;
      if (revealIdentity === "recruiter") {
        setId(JSON.parse(localStorage.getItem("recruiter"))._id);
        console.log(recruiterId);
      }
      else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Nabvar />

        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <h1>
              <i className="fa-sharp fa-solid fa-bars" />
            </h1>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <MDBContainer>
              <Nav className="mr-auto text-center">
                <MDBContainer>
                  <Nav.Link
                    href="/recruiter/dashboard"
                    style={{ color: "#004c4c" }}
                  >
                    &nbsp;&nbsp;<i className="fa-solid fa-font-awesome"></i>
                    &nbsp;&nbsp;Dashboard
                  </Nav.Link>
                </MDBContainer>
                <MDBContainer>
                  <Nav.Link
                    href={`/recruiter/jobs/${recruiterId}`}
                    style={{ color: "#004c4c" }}
                  >
                    &nbsp;&nbsp;
                    <i className="fa-sharp fa-solid fa-briefcase"></i>
                    &nbsp;&nbsp;View Jobs
                  </Nav.Link>
                </MDBContainer>
                <MDBContainer>
                  <Nav.Link
                    href="/recruiter/reset-password"
                    style={{ color: "#004c4c" }}
                  >
                    &nbsp;&nbsp;<i className="fa-solid fa-lock"></i>
                    &nbsp;&nbsp;Change Password
                  </Nav.Link>
                </MDBContainer>
                <MDBContainer>
                  <Nav.Link
                    href="/recruiter/contact-form"
                    style={{ color: "#004c4c" }}
                  >
                    &nbsp;&nbsp;<i className="fa-solid fa-envelope"></i>
                    &nbsp;&nbsp;Contact
                  </Nav.Link>
                </MDBContainer>
              </Nav>
            </MDBContainer>
          </Navbar.Collapse>
        </Navbar>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Recruiter;
