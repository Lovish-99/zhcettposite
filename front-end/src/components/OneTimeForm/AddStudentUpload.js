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
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import base64 from "base64-js";
import ReactLoading from "react-loading";
import { API_URL } from '../../helper';

const AddStudentUpload = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  var Images = [];
  var uploadImages = [];
  const [nextButton, setnextbutton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const idd = JSON.parse(localStorage.getItem("student"))._id;

  function covertToBase64(e) {
    var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      var Name = `${e.target.files[0].name}`;
      var neww = Images.find((person) => person.fileType === e.target.id);
      console.log(reader.result);
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log(uint8Array);
      const base64String = base64.fromByteArray(uint8Array);
      if (neww) {
        const Index = Images.findIndex(
          (person) => person.fileType === e.target.id
        );
        Images[Index].fileName = Name;
        Images[Index].dataImage = base64String;
        uploadImages[Index].fileName = Name;
      } else {
        Images = Images.filter((person) => person.fileType !== e.target.id);
        uploadImages.push({
          fileType: e.target.id,
          fileName: Name,
        });
        Images.push({
          fileType: e.target.id,
          fileName: Name,
          dataImage: base64String,
        });
      }
      console.log(Images);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function setDocuments() {
    localStorage.setItem("upload", JSON.stringify(uploadImages));
  }
  const NextButton = () => {
    navigate("/onetimeform/reviewform");
  };
  const uploadImage = async () => {
    setLoading(true);
    await fetch(`${API_URL}/docapi/upload-image`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        studentId: idd,
        stdupload: Images,
      }),
    });
    setLoading(false);
  }

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      const auth2 = localStorage.getItem("upload");
      if (!auth2) {
        setnextbutton(true);
      } else {
        setnextbutton(false);
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Mtech = JSON.parse(localStorage.getItem("stdprofile")).course;

  const authh = JSON.parse(localStorage.getItem("stdprofile")).disability;

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5">
        <MDBCardBody>
          <MDBCardHeader style={{ textAlign: "center" }}>
            UPLOAD DOCUMENTS
          </MDBCardHeader>
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form>
            <MDBRow>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload High School Marksheet
                  <span style={{ color: "red", fontSize: "20px" }}>*</span> :
                </label>
                <input
                  id="High School Marksheet"
                  accept=".pdf"
                  type="file"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Intermediate Marksheet
                  <span style={{ color: "red", fontSize: "20px" }}>*</span> :
                </label>
                <input
                  id="Intermediate Marksheet"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Diploma Marksheet :
                </label>
                <input
                  id="Diploma Marksheet"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                ></input>
              </MDBCol>
              <MDBCol></MDBCol>
            </MDBRow>

            {Mtech === "B.Tech" ? (
              <>
                <hr />
                <MDBRow style={{ height: "30px" }}>
                  <MDBCol>For Undergraduate:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 1st SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="1st SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 2nd SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="2nd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 3rd SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="3rd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 4th SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="4th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 5th SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="5th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 6th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="6th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                  </MDBCol>
                </MDBRow>
              </>
            ) : null}

            {Mtech === "B.E" ? (
              <>
                <hr />
                <MDBRow style={{ height: "30px" }}>
                  <MDBCol>For B.E:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 1st SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="1st SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 2nd SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="2nd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 3rd SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="3rd SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 4th SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="4th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 5th SEM B-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="5th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 6th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="6th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 7th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="7th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 8th SEM B-tech Marksheet :
                    </label>
                    <input
                      id="8th SEM B-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                  </MDBCol>
                </MDBRow>
              </>
            ) : null}

            {Mtech === "M.Tech" ? (
              <>
                <hr />
                <MDBRow style={{ height: "30px" }}>
                  <MDBCol>For PostGraduate:</MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Btech-Degree
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="Btech-Degree"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Final Btech-Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="Final Btech-Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ height: "20px" }}></MDBRow>
                <MDBRow>
                  <MDBRow style={{ height: "30px" }}>
                    <MDBCol>M.Tech Marksheets</MDBCol>
                  </MDBRow>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 1st SEM M-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="1st SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 2nd SEM M-tech Marksheet
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="2nd SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                    <MDBRow style={{ height: "30px" }}></MDBRow>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload 3rd SEM M-tech Marksheet :
                    </label>
                    <input
                      id="3rd SEM M-tech Marksheet"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                    ></input>
                  </MDBCol>
                </MDBRow>
              </>
            ) : null}

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <hr />
            <MDBRow>
              {" "}
              {authh === "Yes" ? (
                <>
                  <MDBCol>
                    <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                      Upload Disability Certificate
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>{" "}
                      :
                    </label>
                    <input
                      id="Disability Certificate"
                      type="file"
                      accept=".pdf"
                      onChange={covertToBase64}
                      required
                    ></input>
                  </MDBCol>
                </>
              ) : null}{" "}
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Internship Certificate
                  <span style={{ color: "red", fontSize: "20px" }}>*</span> :
                </label>
                <input
                  id="Internship Certificate"
                  type="file"
                  accept=".pdf"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "40px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
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
                      <ReactLoading type="spin" color="#0000FF" height={60} width={30} />
                    </MDBContainer>
                  ) : (
                    <MDBBtn
                      type="submit"
                      onClick={() => {
                        setDocuments();
                        uploadImage();
                      }}
                    >
                      Save
                    </MDBBtn>
                  )};
                </>
              </MDBCol>
              <MDBCol>
                <MDBBtn
                  type="button"
                  onClick={() => {
                    NextButton();
                  }}
                  disabled={nextButton}
                >
                  Next
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddStudentUpload;
