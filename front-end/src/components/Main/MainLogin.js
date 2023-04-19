import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import "./login.css";

const MainLogin = () => {
  return (
    <div style={{minHeight:'100vh'}}> 
    <MDBContainer>
      <MDBRow>
        <MDBCol md={6}>
          <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
            <MDBCardBody style={{ textAlign: "center" }}>
              <MDBRow style={{ height: "70px" }} />
              <MDBBtn style={{ height: "40px", backgroundColor: "green" }}>
                Bussiness
              </MDBBtn>
              <MDBRow style={{ height: "10px" }} />
              <h2>
                For <span style={{ color: "green" }}> Companies</span>
              </h2>
              <MDBRow style={{ height: "30px" }} />
              <p>
                We are the market–leading technical interview platform to
                <br /> identify and hire developers with the right skills.
              </p>
              <MDBRow style={{ height: "40px" }} />
              <Link to="/complogin">
                <MDBBtn>Login</MDBBtn>
              </Link>
              <MDBRow style={{ height: "20px" }} />
              <p>
                Don't have an account?
                <br />
                <Link to="/compregister">SignUp</Link>
              </p>
              <MDBRow style={{ height: "70px" }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md={6}>
          <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
            <MDBCardBody style={{ textAlign: "center" }}>
              <MDBRow style={{ height: "70px" }} />
              <MDBBtn style={{ height: "40px", backgroundColor: "green" }}>
                Academic
              </MDBBtn>
              <MDBRow style={{ height: "10px" }} />
              <h2>
                For <span style={{ color: "green" }}> Students</span>
              </h2>
              <MDBRow style={{ height: "30px" }} />
              <p>
                Join over thousands of students, manage
                <br /> their profiles and get hired.
              </p>
              <MDBRow style={{ height: "40px" }} />
              <Link to="/stdlogin">
                <MDBBtn>Login</MDBBtn>
              </Link>
              <MDBRow style={{ height: "20px" }} />
              <p>
                Don't have an account?
                <br />
                <Link to="/stdregister">SignUp</Link>
              </p>
              <MDBRow style={{ height: "70px" }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default MainLogin;
