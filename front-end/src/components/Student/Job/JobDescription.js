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
import {API_URL} from '../../../helper';

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

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

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

      let data = await fetch(
        `${API_URL}/dataapi/add-data/${idd}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentEmail,
          position,
          companyName,
          studentName,
        })
      });
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
                  <Document
                    file={profiles.supportiveDocs}
                    options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBBtn
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                    >
                      Previous
                    </MDBBtn>

                    <MDBBtn
                      type="button"
                      disabled={pageNumber >= numPages}
                      onClick={nextPage}
                    >
                      Next
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
