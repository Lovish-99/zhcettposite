import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const RecruiterDash = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const identity = JSON.parse(localStorage.getItem("recruiter"));
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  let recruiterId = "";

  useEffect(() => {
    if (!authorize || !identity) {
      navigate("/");
    } else {
      const revealIdentity = identity.role;
      if (revealIdentity === "recruiter") {
        recruiterId = JSON.parse(localStorage.getItem("recruiter"))._id;
        getCompanyDetails();
      } else {
        navigate("/");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompanyDetails = async () => {
    if (authorize) {
      setLoading(true);
      let result = await fetch(
        `${API_URL}/employInfoapi/add-data/${recruiterId}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      if (result.status === "ok") {
        result = result.data.data;
        setDetails(result);
        localStorage.setItem("companyDetails", JSON.stringify(result));
        setLoading(false);
      } else {
        navigate("/addCompanyDetails");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <MDBContainer
          className="mt-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </MDBContainer>
      ) : (
        <>
          <MDBContainer>
            <MDBCard className="text-black m-5">
              <MDBCardBody>
                <MDBRow className="text-center">
                  <MDBCol>
                    <MDBRow style={{ color: "teal" }}>
                      <h2>Welcome {details.companyName} !</h2>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <h3>ABOUT</h3>
                      <p style={{ textAlign: "justify", fontSize: "20px" }}>
                        {details.about}
                      </p>
                    </MDBRow>
                    <hr />
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <h3>VISION & MISSION</h3>
                      <p style={{ textAlign: "justify", fontSize: "20px" }}>
                        {details.visionAndmission}
                      </p>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <h4>Department :{details.department}</h4>
                      </MDBCol>
                      <MDBCol>
                        <h4>Location :{details.location}</h4>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "40px" }}></MDBRow>
                    <hr />
                    <MDBRow style={{ height: "10px" }}></MDBRow>
                    <MDBRow style={{ color: "teal" }}>
                      <MDBCol>
                        <h3>HIRING MANAGER INFO</h3>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <h4>Name :{details.hiringManagerName}</h4>
                      </MDBCol>
                      <MDBCol>
                        <h4>Post :{details.hiringManagerPost}</h4>
                      </MDBCol>
                      <MDBCol>
                        <h4>Contact :{details.hiringManagerContact}</h4>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <p style={{ textAlign: "justify", fontSize: "20px" }}>
                        {details.hiringManagerBio}
                      </p>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default RecruiterDash;
