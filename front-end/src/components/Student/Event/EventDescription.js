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

const EventDescription = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  let { id } = useParams();
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
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
      let result = await fetch(
        `${API_URL}/eventapi/get-event/${id}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      setProfiles(result.data);
      setLoading(false);
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
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md={4}>
                    <h1 style={{ color: "#004c4c", fontWeight: "bold" }}>
                      {profiles.title}
                    </h1>
                  </MDBCol>
                  <MDBCol md={4} style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#004c4c" }}>{profiles.location}</h1>
                  </MDBCol>
                  <MDBCol md={4} style={{ textAlign: "right" }}>
                    <h1 style={{ color: "#004c4c" }}>{profiles.date}</h1>
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
                <div style={{ fontSize: "19px", textAlign: "justify" }}>
                  <p>{profiles.stipend}</p>
                </div>
                <MDBRow>
                  <MDBRow style={{ height: "10px" }} />

                  <MDBRow>
                    <MDBCol>
                      <h3>Organizer Details:</h3>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{ height: "10px" }} />

                  <div style={{ fontSize: "19px", textAlign: "justify" }}>
                    <MDBRow>
                      <MDBCol>Name: {profiles.name}</MDBCol>
                      <MDBCol>Email: {profiles.email}</MDBCol>
                      <MDBCol>Contact: {profiles.phone}</MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow style={{ height: "25px" }} />
                  <MDBRow>
                    <div>
                      <h3>About Event:</h3>
                    </div>
                  </MDBRow>
                  <MDBRow style={{ height: "10px" }} />
                  <div style={{ fontSize: "19px", textAlign: "justify" }}>
                    <p>{profiles.description}</p>
                  </div>
                  <MDBRow style={{ height: "10px" }} />
                  <MDBRow style={{ height: "40px" }} />

                  <MDBCol>
                    <Link to="#">
                      <MDBBtn>Register IT!</MDBBtn>
                    </Link>
                  </MDBCol>
                  <MDBCol>
                    <Link to="/student/viewEvent">
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

export default EventDescription;
