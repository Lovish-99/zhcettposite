import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import "./login.css";

const MainLogin = () => {
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md={6}>
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px"}}>
              <MDBCardBody style={{ textAlign: "center" }}>
                <MDBRow style={{ height: "70px" }} />
                <MDBBtn style={{ height: "40px", backgroundColor: "green" }}>
                  Business
                </MDBBtn>
                <MDBRow style={{ height: "10px" }} />
                <h2>
                  For <span style={{ color: "green" }}> Companies</span>
                </h2>
                <MDBRow style={{ height: "30px" }} />
                <p>
                  Access the power of our recruitment platform and find the perfect candidate for your team.
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
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px"}}>
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
                  Unlock your potential and discover exciting career opportunities with our student portal.
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
