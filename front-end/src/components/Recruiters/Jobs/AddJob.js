import React from "react";
import {
  MDBBtn, MDBContainer, MDBRow, MDBCard, MDBInput, MDBCardBody, MDBCol, MDBTextArea
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../../../helper';
import ReactLoading from "react-loading";
import base64 from 'base64-js';

const AddJob = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyName] = useState("");
  const [position, setposition] = useState("");
  const [lastApplyDate, setlastApplyDate] = useState("");
  const [requirements, setrequirements] = useState("");
  const [stipend, setstipend] = useState("");
  const [supportiveDocs, setsupportiveDocs] = useState("");
  const [description, setdescription] = useState("");
  const [jobType, setjobType] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [email, setRecruiterEmail] = useState("");
  const [mobile, setRecruiterMobile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (!authorize) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const covertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64String = base64.fromByteArray(uint8Array);
      setsupportiveDocs(base64String);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  const recruiterId = JSON.parse(localStorage.getItem("recruiter"))._id;
  console.log(recruiterId);

  const uploadJob = async () => {
    setLoading(true);
    await fetch(`${API_URL}/jobapi/upload-job`, {
      method: "post",
      body: JSON.stringify({
        companyName,
        position,
        lastApplyDate,
        requirements,
        jobType,
        stipend,
        supportiveDocs,
        description,
        recruiterId,
        email,
        mobile,
        recruiterName,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === "ok") {
          setLoading(false);
          alert("job added succesfully!");
          navigate("/admin/viewJob");
        }
      });

  };

  return (
    <>
      {
        loading ? (
          <MDBContainer
            className="mt-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
          </MDBContainer >
        ) : (
          <>
            <MDBContainer >
              <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      ADD JOB OPPORTUNITY
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ height: "20px" }}></MDBRow>
                  <form >
                    <MDBRow>
                      <MDBCol>
                        <label>Company Name: </label>
                        <MDBInput
                          id="companyName"
                          required
                          type="text"
                          value={companyName}
                          onChange={(e) => setcompanyName(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Position Name: </label>
                        <MDBInput
                          id="position"
                          required
                          type="text"
                          value={position}
                          onChange={(e) => setposition(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Job Type: </label>
                        <MDBInput
                          id="position"
                          required
                          type="text"
                          value={jobType}
                          onChange={(e) => setjobType(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <label>Recruiter Name: </label>
                        <MDBInput
                          id="recruiterName"
                          required
                          type="text"
                          value={recruiterName}
                          onChange={(e) => setRecruiterName(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Last Date For Registration: </label>
                        <MDBInput
                          id="lastApplyBy"
                          required
                          type="date"
                          value={lastApplyDate}
                          onChange={(e) => setlastApplyDate(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Stipend : </label>
                        <MDBInput
                          id="stipend"
                          required
                          type="text"
                          value={stipend}
                          onChange={(e) => setstipend(e.target.value)}
                        ></MDBInput>
                      </MDBCol>

                    </MDBRow>

                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <label>Recruiter Email : </label>
                        <MDBInput
                          id="email"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setRecruiterEmail(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Contact No. : </label>
                        <MDBInput
                          id="mobile"
                          required
                          type="tel"
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => setRecruiterMobile(e.target.value)}
                        ></MDBInput>
                      </MDBCol>
                      <MDBCol>
                        <label>Upload SupportiveDocs: </label>
                        <input
                          id="supportivedoc"
                          accept=".pdf, .jpg, .jpeg, .doc"
                          type="file"
                          onChange={covertToBase64}
                        ></input>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <label>Requirements: </label>
                        <MDBTextArea
                          id="description"
                          required
                          type="text"
                          value={requirements}
                          rows={4}
                          onChange={(e) => setrequirements(e.target.value)}
                        ></MDBTextArea>
                      </MDBCol>
                      <MDBCol>
                        <label>Description: </label>
                        <MDBTextArea
                          id="description"
                          required
                          type="text"
                          rows={4}
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        ></MDBTextArea>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBBtn type="submit" onClick={() => uploadJob()}>
                          Save
                        </MDBBtn>
                      </MDBCol>
                      <MDBCol>
                        <Link to={`/recruiter/jobs/${recruiterId}`}>
                          <MDBBtn>Back</MDBBtn>
                        </Link>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </>
        )}
    </>
  );
};

export default AddJob;
