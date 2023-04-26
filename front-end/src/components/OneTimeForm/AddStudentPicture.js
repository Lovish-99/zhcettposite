import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import {
  MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardHeader, MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import base64 from 'base64-js';

function AddStudentPicture() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  var Images = [];
  const [nextButton, setnextbutton] = useState(false);
  const navigate = useNavigate();
  function covertToBase64(e) {
    var reader = new FileReader();
    reader.onload = () => {
      var Name = `${e.target.files[0].name}`;
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64String = base64.fromByteArray(uint8Array);
      var neww = Images.find((person) => person.fileType === e.target.id);
      if (neww) {
        const Index = Images.findIndex(
          (person) => person.fileType === e.target.id
        );
        console.log(Index);
        Images[Index].fileName = Name;
        Images[Index].dataImage = base64String;
      } else {
        Images = Images.filter((person) => person.fileType !== e.target.id);
        Images.push({
          fileType: e.target.id,
          fileName: Name,
          dataImage: base64String,
        });
      }
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function setDocuments() {
    var photo = Images.find((person) => person.fileType === "Photograph");
    var resume = Images.find((person) => person.fileType === "Resume");
    localStorage.setItem("picresume", JSON.stringify(Images));
    localStorage.setItem("photo", JSON.stringify(photo));
    localStorage.setItem("resume", JSON.stringify(resume));
  }
  const NextButton = () => {
    navigate("/onetimeform/addstdperaddress");
  };

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      const auth2 = localStorage.getItem("picresume");
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

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5">
        <MDBCardBody>
          <MDBCardHeader style={{ textAlign: "center" }}>
            UPLOAD DOCUMENTS
          </MDBCardHeader>
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form>
            <MDBRow style={{ height: "20px" }}>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload PHOTOGRAPH <span style={{color: "red", fontSize:"20px"}}>*</span>:
                </label>
                <input
                  id="Photograph"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow style={{ height: "20px" }}></MDBRow>
            <hr/>
            <MDBRow>
              <MDBCol>
                <label htmlFor="file" style={{ paddingBottom: "10px" }}>
                  Upload Resume <span style={{color: "red", fontSize:"20px"}}>*</span>:
                </label>
                <input
                  id="Resume"
                  accept=".pdf"
                  type="file"
                  onChange={covertToBase64}
                  required
                ></input>
              </MDBCol>
            </MDBRow>
            
            <MDBRow style={{ height: "40px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit" onClick={setDocuments}>
                  Save
                </MDBBtn>
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
}

export default AddStudentPicture;
