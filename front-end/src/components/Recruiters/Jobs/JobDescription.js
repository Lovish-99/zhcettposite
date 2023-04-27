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
import { API_URL } from "../../../helper";
import ReactLoading from "react-loading";

const JobDescription = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const auth = JSON.parse(localStorage.getItem("token"));
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recruiter = JSON.parse(localStorage.getItem("recruiter"))._id;

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      let result = await fetch(
        `${API_URL}/jobapi/get-job-recruiter/${id}/${recruiter}`,
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
                    <Link to={`/recruiter/jobs/${recruiter}`}>
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
