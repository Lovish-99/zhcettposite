import React from "react";
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "../Student/Qualification/Button";
import { Link, useNavigate } from "react-router-dom";
import AddQualify from "../Student/Qualification/addqualify";

const AddStudentEducat = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(["Sample"]);

  const shootdiv = () => {
    setShow([...show, "Sample"]);
  };
  const NextButton = () => {
    navigate("/onetimeform/addstdupload");
  };
  return (
    <>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5">
          <MDBCardBody>
          <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol><h3>Qualification Details</h3></MDBCol>
              <MDBCol>
                  <Link to="/student/addstdperaddress">
                  <MDBBtn type="button">Back</MDBBtn>
                </Link>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              {show.map((item, i) => (
                <MDBRow key={item}>
                  <AddQualify text={item} />
                  <MDBCol>
                    <Button onClick={shootdiv} text="Add Another Education" />
                  </MDBCol>
                  <MDBRow style={{ height: "40px" }}></MDBRow>
                </MDBRow>
              ))}
            </MDBRow>
            <MDBRow style={{ height: "50px" }}></MDBRow>
            <MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBBtn
                    type="submit"
                    onClick={() => {
                      NextButton();
                    }}
                  >
                    Next
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default AddStudentEducat;
