import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { API_URL } from "../../../helper";

const JobDescription = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  let { jobPostid } = useParams();
  const auth = JSON.parse(localStorage.getItem("token"));
  const idd = JSON.parse(localStorage.getItem("student"))._id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    setLoading(true);
    if (auth) {
      let result = await fetch(`${API_URL}/jobapi/get-job/${jobPostid}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setProfiles(result.data);

      let data = await fetch(`${API_URL}/dataapi/add-data/${idd}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      data = await data.json();
      setStudentData(data.data.data);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  const apply = async () => {
    let jobId = jobPostid;
    let studentId = idd;
    let studentName = studentData.username;
    let studentBranch = studentData.stdprofile.department;
    let studentEmail = studentData.email;
    let resume = studentData.resume.resume[0]["dataImage"];
    let recruiterId = profiles.recruiterId;
    let email = profiles.email;
    let recruiterName = profiles.recruiterName;
    let mobile = profiles.mobile;
    let companyName = profiles.companyName;
    let position = profiles.position;
    let jobtype = profiles.jobType;
    let out = await fetch(`${API_URL}/applyjobapi/apply-to-job`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        jobId,
        recruiterId,
        recruiterName,
        email,
        mobile,
        studentBranch,
        studentEmail,
        resume,
        studentName,
        studentId,
        companyName,
        position,
        jobtype,
      }),
    });
    out = await out.json();
    if (out.status === "ok") {
      console.log("api hit");
      alert("Applied to job successfully");
    } else if (out.status === "applied") {
      alert("Already Applied for this Job!");
    } else {
      alert("something is wrong");
    }

    await fetch(`${API_URL}/mailapi/notify-jobapply-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentEmail,
        position,
        companyName,
        studentName,
      }),
    });
  };

  function openBase64NewTab(base64Pdf) {
    var blob = base64toBlob(base64Pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }

  function base64toBlob(base64Data) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  }

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
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md={4}>
                    <h1 style={{ color: "#004c4c", fontWeight: "bold" }}>
                      {profiles.companyName}
                    </h1>
                  </MDBCol>
                  <MDBCol md={4} style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#004c4c" }}>{profiles.position}</h1>
                  </MDBCol>
                  <MDBCol md={4} style={{ textAlign: "right" }}>
                    <h1 style={{ color: "#004c4c" }}>{profiles.jobType}</h1>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{ height: "10px" }} />
                <MDBRow className="text-center">
                  <MDBCol>
                  <MDBBtn
                    type="button"
                    onClick={() => openBase64NewTab(profiles.supportiveDocs)}
                  >
                    VIEW DOCUMENT
                  </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ height: "10px" }} />
                <MDBRow>
                  <MDBCol>
                    <h3>Stipend:</h3>
                  </MDBCol>
                </MDBRow>
                <div style={{ fontSize: "19px", textAlign: "justify" }}>
                  <p>{profiles.stipend}</p>
                </div>
                <MDBRow>
                  <MDBRow style={{ height: "10px" }} />
                  <MDBRow>
                    <div>
                      <h3>Description:</h3>
                    </div>
                  </MDBRow>
                  <MDBRow style={{ height: "10px" }} />
                  <div style={{ fontSize: "19px", textAlign: "justify" }}>
                    <p>{profiles.description}</p>
                  </div>
                  <MDBRow style={{ height: "10px" }} />
                  <MDBRow>
                    <MDBCol>
                      <h3>Requirements:</h3>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{ height: "10px" }} />

                  <div style={{ fontSize: "19px", textAlign: "justify" }}>
                    <p>{profiles.requirements}</p>
                  </div>
                  <MDBRow style={{ height: "10px" }} />

                  <MDBCol>
                    <MDBBtn onClick={() => apply()}>APPLY TO JOB</MDBBtn>
                  </MDBCol>
                  <MDBCol>
                    <Link to="/student/jobsnotify">
                      <MDBBtn>Back</MDBBtn>
                    </Link>
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

export default JobDescription;
