import React, { useEffect } from "react";
import {
  MDBContainer
} from "mdb-react-ui-kit";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from '../../Main/footer/footer';
import { Nav, Navbar } from 'react-bootstrap';
import './admin.css';
import Nabvar from '../../Main/navbar/Navbar';

const Admin = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const identity = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorize || !identity) {
      navigate("/");
    }
    else{
      const revealIdentity = identity.role;
      if (revealIdentity === "recruiter") {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nabvar />
      <Navbar bg="light" expand="lg" >
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <h1><i className="fa-sharp fa-solid fa-bars" /></h1>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" >
          <MDBContainer >
            <Nav className="mr-auto text-center" activeKey="home">
              <Nav.Link eventKey="home" href="/admin/manageadmin" >
                &nbsp;&nbsp;<i className="fa-solid fa-font-awesome"></i>&nbsp;&nbsp;Manage Admin</Nav.Link>
              <Nav.Link href="/admin/managestd" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-solid fa-user"></i>&nbsp;&nbsp;Manage Student</Nav.Link>
              <Nav.Link href="/admin/managecomp" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-solid fa-address-card"></i>&nbsp;&nbsp;Manage Recruiter</Nav.Link>
              <Nav.Link href="/admin/viewJob" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-sharp fa-solid fa-briefcase"></i>&nbsp;&nbsp;View Jobs</Nav.Link>
              <Nav.Link href="/admin/viewEvent" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;Ongoing Events</Nav.Link>
              <Nav.Link href="/admin/reset-password" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-solid fa-lock"></i>&nbsp;&nbsp;Change Password</Nav.Link>
              <Nav.Link href="/admin/uploadfile" style={{ color: "#004c4c" }}>&nbsp;&nbsp;<i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;Upload Csv File</Nav.Link>
            </Nav>
          </MDBContainer>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Admin;
