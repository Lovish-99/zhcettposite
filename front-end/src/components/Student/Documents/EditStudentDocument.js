import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ReactLoading from "react-loading";
import base64 from 'base64-js';
import {API_URL} from '../../../helper';

const EditStudentDocument = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  var Images = [];
  var uploadImages = JSON.parse(localStorage.getItem("upload"));
  const [type, settype] = useState("");
  const navigate = useNavigate();
  const idd = JSON.parse(localStorage.getItem("student"))._id;
  var [uploads, setuploads] = useState([]);
  const [loading, setLoading] = useState(false);
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
          console.log(data.data.stdupload)
          setLoading(false);
        } else {
        }
      });
  };

  function covertToBase64(e) {
    var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      var Name = `${e.target.files[0].name}`;
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log(uint8Array);
      const base64String = base64.fromByteArray(uint8Array);
      const Index = uploads.findIndex(
        (person) => person.fileType === e.target.id
      );
      uploads[Index].fileName = Name;
      uploads[Index].dataImage = base64String;
      Images = uploads;
      uploadImages[Index].fileName = Name;
      
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  }
  const update_documents = async () => {
    setLoading(true);
    await fetch(`${API_URL}/docapi/update-image/${idd}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        stdupload: Images,
      }),
    }).then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        setLoading(false);
        alert('Document Updated Sucessfully')
        
      } else {
      }
    });
  };
  function setDocuments() {
    localStorage.setItem("upload", JSON.stringify(uploadImages));
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
                <MDBCardHeader style={{ textAlign: "center" }}>
                  UPDATE AND VIEW DOCUMENTS
                </MDBCardHeader>
                <MDBRow style={{ height: "20px" }}></MDBRow>
                <form>
                  <MDBRow>
                    <MDBCol
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      UPDATE DOCUMENTS
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{ height: "20px" }}></MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <label>Type of Document :</label>
                      <select
                        className="form-control select2"
                        name="result"
                        id="result"
                        required
                        aria-hidden="true"
                        value={type}
                        onChange={(e) => settype(e.target.value)}
                      >
                        <option>Please select</option>
                        {uploads ? (
                          <>
                            {uploads.map((item) => {
                              return (
                                <option
                                  key={item.fileType}
                                  value={item.fileType}
                                >
                                  {item.fileType}
                                </option>
                              );
                            })}
                          </>
                        ) : null}
                      </select>
                    </MDBCol>
                    <MDBCol>
                      <label style={{ paddingBottom: "10px" }}>
                        Update Selected Document/Marksheet :
                      </label>
                      <input
                        id={type}
                        accept=".pdf, .jpeg, .jpg, .png"
                        type="file"
                        onChange={covertToBase64}
                        required
                      ></input>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{ height: "20px" }}></MDBRow>

                  <MDBRow>
                    <MDBCol>
                      <MDBBtn
                        type="submit"
                        onClick={() => {
                          setDocuments();
                          update_documents();
                        }}
                      >
                        Update
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol>
                      <Link to="/student/dashboard">
                        <MDBBtn type="button">Back</MDBBtn>
                      </Link>
                    </MDBCol>
                    <MDBCol>
                      <Link to="/student/viewDocument">
                        <MDBBtn type="button">VIEW SUBMITTED DOCUMENTS</MDBBtn>
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

export default EditStudentDocument;
