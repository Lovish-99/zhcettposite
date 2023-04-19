import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const MainRegister = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("student");
    if (auth) {
      navigate("/");
    }
  });

  return (
    <MDBContainer style={{ minHeight: '90vh' }}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md={6} style={{ textAlign: "justify", padding: "40px" }}>
              <h1>
                How do you want to use
                <br />
                Placement Cell?
              </h1>
              <MDBRow style={{ height: "30px" }}></MDBRow>
              <MDBCard style={{ borderRadius: "0px", width: "50%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md={1}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </MDBCol>
                    <MDBCol md={11}>
                      <Link to="/compregister">
                        I'm here to hire tech talent.
                      </Link>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow style={{ height: "30px" }}></MDBRow>
              <MDBCard style={{ borderRadius: "0px", width: "50%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md={1}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </MDBCol>
                    <MDBCol md={11}>
                      <Link to="/stdregister">I'm here to participate.</Link>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol
              md={6}
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://us.123rf.com/450wm/zovicota/zovicota2101/zovicota210100002/161517706-interview-employment-process-candidate-selection-recruitment-and-placement-service-recruiting.jpg?ver=6"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default MainRegister;
