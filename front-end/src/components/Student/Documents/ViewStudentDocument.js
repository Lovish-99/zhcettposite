import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pdfjs } from "react-pdf";
import ReactLoading from "react-loading";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {API_URL} from '../../../helper';

const ViewStudentDocument = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  var [uploads, setuploads] = useState([]);
  const idd = JSON.parse(localStorage.getItem("student"))._id;
  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      get_documents();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const get_documents = async () => {
    setLoading(true);
    await fetch(`${API_URL}/docapi/get-image/${idd}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setuploads(data.data.stdupload);
          console.log(data.data.stdupload);
          setLoading(false);
        } else {
        }
      });
  };

  // function openBase64NewTab(base64Pdf) {
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
            <MDBCard className="text-black m-5">
              <MDBCardBody>
                <MDBRow>
                  <MDBRow style={{ height: "20px" }}></MDBRow>
                  <MDBRow>
                    <MDBCol
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      VIEW DOCUMENTS
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{ height: "20px" }}></MDBRow>
                  {uploads ? (
                    <>
                      {uploads.map((item) => {
                        return (
                          <>
                            <MDBRow key={item.fileType}>
                              <MDBCol>{item.fileType}</MDBCol>
                              <MDBCol>{item.fileName}</MDBCol>
                              <MDBCol>
                                {/* <Link to={`/student/${idd}/${item.fileType}`}> */}
                                <MDBBtn
                                  type="button"
                                  onClick={() =>
                                    openBase64NewTab(item.dataImage)
                                  }
                                >
                                  VIEW DOCUMENT
                                </MDBBtn>
                                {/* </Link> */}
                              </MDBCol>
                            </MDBRow>
                            <MDBRow style={{ height: "20px" }}></MDBRow>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </MDBRow>

                <MDBRow style={{ height: "20px" }} />
                <MDBRow>
                  <MDBCol>
                    <Link to="/student/editstdupload">
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

export default ViewStudentDocument;
