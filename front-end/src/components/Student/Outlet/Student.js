import React, { useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Nabvar from "../../Main/navbar/Navbar";
import { Nav, Navbar } from "react-bootstrap";
import Footer from "../../Main/footer/footer";

function Student() {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const identity = JSON.parse(localStorage.getItem("student"));
  const navigate = useNavigate();
  const status = localStorage.getItem("form");
  useEffect(() => {
    if (!authorize || !identity) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Nabvar />

        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <h1><i className="fa-sharp fa-solid fa-bars" /></h1>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <MDBContainer>
              <Nav className="mr-auto text-center">
                <Nav.Link href="/student/dashboard" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-font-awesome"></i>&nbsp;&nbsp;Dashboard
                </Nav.Link>
                <Nav.Link href="/student/stdprofile" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-user"></i>&nbsp;&nbsp;Profile
                </Nav.Link>
                <Nav.Link href="/student/stdaddress" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-address-card"></i> &nbsp;&nbsp;Address
                </Nav.Link>
                <Nav.Link href="/student/stdqualify" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-school"></i>&nbsp;&nbsp;Qualification
                </Nav.Link>
                <Nav.Link href="/student/editstdupload" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-file"></i>&nbsp;&nbsp;Documents
                </Nav.Link>
                <Nav.Link href="/student/jobsnotify" style={{ color: "#004c4c" }}>
                  &nbsp;&nbsp;<i className="fa-sharp fa-solid fa-briefcase"></i>&nbsp;&nbsp;View Jobs
                </Nav.Link>
                <Nav.Link href="/student/viewEvent" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;Ongoing Events
                </Nav.Link>
                <Nav.Link href="/student/reset-pass" style={{ color: "#004c4c" }} >
                  &nbsp;&nbsp;<i className="fa-solid fa-lock"></i>&nbsp;&nbsp;Change Password
                </Nav.Link>
                <Nav.Link href="/student/sendMail" style={{ color: "#004c4c" }}>
                  &nbsp;&nbsp;<i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;Contact
                </Nav.Link>
              </Nav>
            </MDBContainer>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {
            status ? <Outlet />
              : <Navigate to="/onetimeform/addstdprofile" />
          }
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Student;
