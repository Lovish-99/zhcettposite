import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {API_URL} from '../../../helper';

const Editstdprofile = () => {
  const [hiringManagerBio, setHiringManagerBio] = useState("");
  const [hiringManagerName, setHiringManagerName] = useState("");
  const [hiringManagerPost, setHiringManagerPost] = useState("");
  const [hiringManagerContact, setHiringManagerContact] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [visionAndmission, setVisionAndmission] = useState("");
  const authorize = JSON.parse(localStorage.getItem("token"));
  const identity = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorize || !identity) {
      navigate("/");
    } else {
      const companyDetailss = JSON.parse(localStorage.getItem("companyDetails"));
      const revealIdentity = identity.role;
      if (revealIdentity === "recruiter") {
        if(companyDetailss){
          navigate("/recruiter/dashboard");
        }
      }
      else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upload_company_data = async () => {
    const recruiterId = JSON.parse(localStorage.getItem("recruiter"))._id;
    await fetch(`${API_URL}/employInfoapi/add-data`, {
      method: "post",
      body: JSON.stringify({
        recruiterId,
        companyName,
        about,
        location,
        department,
        visionAndmission,
        hiringManagerBio,
        hiringManagerContact,
        hiringManagerName,
        hiringManagerPost,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    localStorage.setItem("companyDetails", "ok");
    alert("Company Details Submitted ")
    navigate("/");
  };

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <h2 className="text-center bg-success text-bg-dark p-2">
            RECRUITER PANEL
          </h2>
          <br />
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ADD COMPANY DETAILS
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>
                  Company Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:{" "}
                </label>
                <MDBInput
                  id="companyname"
                  required
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>
                  Location{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <MDBInput
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Department </label>
                <MDBInput
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                  type="text"
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>
                  About Company
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <MDBTextArea
                  id="about"
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                  rows={4}
                ></MDBTextArea>
              </MDBCol>
              <MDBCol>
                <label>
                  Vision & Mission
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <MDBTextArea
                  id="about"
                  type="text"
                  value={visionAndmission}
                  onChange={(e) => setVisionAndmission(e.target.value)}
                  required
                  rows={4}
                ></MDBTextArea>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "40px" }}></MDBRow>
            <MDBRow style={{ height: "20px", textAlign: "center" }}>
              <MDBCol>
                <h4>Add Hiring Manager Details</h4>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow style={{ height: "10px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>
                  Hiring Manager Name
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <MDBInput
                  id="mname"
                  type="text"
                  value={hiringManagerName}
                  onChange={(e) => setHiringManagerName(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>
                  Hiring Manager Post
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <MDBInput
                  id="mPost"
                  type="text"
                  value={hiringManagerPost}
                  onChange={(e) => setHiringManagerPost(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>
                  Mobile Number{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:
                </label>
                <PhoneInput
                  country={"in"}
                  value={hiringManagerContact}
                  onChange={setHiringManagerContact}
                  required
                />
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>
                  Hiring Manager Bio{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>:{" "}
                </label>
                <MDBTextArea
                  id="description"
                  required
                  type="text"
                  rows={4}
                  value={hiringManagerBio}
                  onChange={(e) => setHiringManagerBio(e.target.value)}
                ></MDBTextArea>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>

            <MDBRow></MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBRow className="text-center">
                <MDBCol>
                  <MDBBtn
                    type="submit"
                    onClick={() => upload_company_data()}
                  >
                    Submit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Editstdprofile;
