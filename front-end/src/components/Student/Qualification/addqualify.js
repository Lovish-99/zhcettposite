import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

const AddQuali = () => {
  const [qualifyLevel, setqualifyLevel] = useState("");
  const [qualifyName, setqualifyName] = useState("");
  const [passYear, setpassYear] = useState("");
  const [board, setBoard] = useState("");
  const [rollNum, setrollNum] = useState("");
  const [resultStatus, setResultStatus] = useState("");
  const [gradeSys, setgradeSys] = useState("");
  const [grade, setGrade] = useState("");
  let education = [];

  const set_student_qualify = async () => {
    const profi = {
      qualifyLevel,
      qualifyName,
      passYear,
      board,
      rollNum,
      resultStatus,
      gradeSys,
      grade,
    };
    const prev = JSON.parse(localStorage.getItem("stdqualify"));
    if (prev) {
      var neww = prev.find(
        (person) => person.qualifyLevel === profi.qualifyLevel
      );
      if (neww) {
        const Index = prev.findIndex(
          (person) => person.qualifyLevel === profi.qualifyLevel
        );
        prev[Index] = profi;
        education = prev;
      } else {
        education = prev.filter(
          (person) => person.qualifyLevel !== profi.qualifyLevel
        );
        education.push(profi);
      }
      localStorage.setItem("stdqualify", JSON.stringify(education));
    } else {
      education.push(profi);
      localStorage.setItem("stdqualify", JSON.stringify(education));
    }
  };

  return (
    <>
      <hr />
      <form>
        <MDBRow>
          <MDBCol>
            <label>Qualification Level <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <select
              className="form-control select2"
              name="qualification"
              id="qualification"
              required
              aria-hidden="true"
              value={qualifyLevel}
              onChange={(e) => setqualifyLevel(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="High School">High School</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Diploma">Diploma</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">Undergraduation(B.Tech)</option>
              <option value="M.Tech">Graduation(M.Tech)</option>
            </select>
          </MDBCol>
          <MDBCol>
            <label>Course Name <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <MDBInput
              id="enumber"
              type="text"
              value={qualifyName}
              onChange={(e) => setqualifyName(e.target.value)}
              required
            ></MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ height: "20px" }}></MDBRow>
        <MDBRow>
          <MDBCol>
            <label>Year Of Passing <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <MDBInput
              id="enumber"
              type="text"
              value={passYear}
              maxLength="4"
              pattern="[0-9]+"
              onChange={(e) => setpassYear(e.target.value)}
              required
            ></MDBInput>
          </MDBCol>
          <MDBCol>
            <label>Roll No <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <MDBInput
              id="enumber"
              type="text"
              value={rollNum}
              pattern="[0-9]*[a-zA-Z]*[0-9]+"
              onChange={(e) => setrollNum(e.target.value)}
              required
            ></MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ height: "20px" }}></MDBRow>
        <MDBRow>
          <MDBCol>
            <label>Board <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <MDBInput
              id="enumber"
              type="text"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              required
            ></MDBInput>
          </MDBCol>
          <MDBCol>
            <label>Result <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <select
              className="form-control select2"
              name="result"
              id="result"
              required
              aria-hidden="true"
              value={resultStatus}
              onChange={(e) => setResultStatus(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Awaited">Awaited</option>
            </select>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ height: "20px" }}></MDBRow>
        <MDBRow>
          <MDBCol>
            <label>Grading System <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <select
              className="form-control select2"
              name="grading system"
              id="grading system"
              required
              aria-hidden="true"
              value={gradeSys}
              onChange={(e) => setgradeSys(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="CPI">CPI</option>
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </select>
          </MDBCol>
          <MDBCol>
            <label>Grade / % <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
            <MDBInput
              id="enumber"
              type="text"
              value={grade}
              pattern="[0-9]*[0-9]*.[0-9]*"
              onChange={(e) => setGrade(e.target.value)}
              required
            ></MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={2}>
            <MDBBtn type="submit" onClick={set_student_qualify}>
              Save
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
      <MDBRow style={{ height: "20px" }}></MDBRow>

      <MDBRow style={{ height: "20px" }}></MDBRow>
    </>
  );
};

export default AddQuali;
