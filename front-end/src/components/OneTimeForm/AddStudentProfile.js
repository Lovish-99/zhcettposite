import React, { useState, useEffect } from "react";
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddStudentProfile = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [nextButton, setnextbutton] = useState(true);
  const [fatherName, setfatherName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [gender, setgender] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartmnet] = useState("");
  const [rollNum, setrollNum] = useState("");
  const [faculty, setFacultyNum] = useState("");
  const [dob, setdob] = useState("");
  const [enrollNum, setenrollNum] = useState("");
  const [mobNum, setmobNum] = useState("");
  const [alternateNum, setalternateNum] = useState("");
  const [disability, setDisability] = useState("");
  const [aadharNum, setaadharNum] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [caste, setcaste] = useState("");
  const [religion, setreligion] = useState("");
  const [firstN, setFirst] = useState("");
  const [middleN, setMiddle] = useState("");
  const [lastN, setLast] = useState("");

  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (authorize) {
      getProductDetails();
      setFirst(JSON.parse(localStorage.getItem("student")).firstName);
      setMiddle(JSON.parse(localStorage.getItem("student")).middleName);
      setLast(JSON.parse(localStorage.getItem("student")).lastName);
      const auth2 = localStorage.getItem("stdprofile");
      if (auth2) {
        const details = JSON.parse(auth2);
        delete details.alternateNum;
        const isEmpty = Object.values(details).some(
          (x) => x === null || x === ""
        );
        if (isEmpty) {
          setnextbutton(true);
        } else {
          setnextbutton(false);
        }
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetails = async () => {
    let result = JSON.parse(localStorage.getItem("stdprofile"));
    if (result) {
      setfatherName(result.fatherName);
      setmotherName(result.motherName);
      setDisability(result.disability);
      setDepartmnet(result.department);
      setCourse(result.course);
      setrollNum(result.rollNum);
      setFacultyNum(result.faculty);
      setaadharNum(result.aadharNum);
      setalternateNum(result.alternateNum);
      setmobNum(result.mobNum);
      setenrollNum(result.enrollNum);
      setbloodGroup(result.bloodGroup);
      setcaste(result.caste);
      setdob(result.dob);
      setgender(result.gender);
      setreligion(result.religion);
    }
  };

  const set_student_profile = async () => {
    const profi = JSON.stringify({
      fatherName,
      motherName,
      gender,
      dob,
      enrollNum,
      mobNum,
      faculty,
      rollNum,
      department,
      alternateNum,
      disability,
      aadharNum,
      bloodGroup,
      caste,
      religion,
      course,
    });
    localStorage.setItem("stdprofile", profi);
  };

  const NextButton = () => {
    navigate("/onetimeform/upload");
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  
  return (
    <MDBContainer fluid>
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
              ADD PROFILE{" "}
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form>
            <MDBRow>
              <MDBCol>
                <label>First Name: </label>
                <MDBInput
                  id="firstname"
                  required
                  type="text"
                  value={firstN}
                  disabled
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Middle Name: </label>
                <MDBInput
                  id="middlename"
                  value={middleN}
                  type="text"
                  disabled
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Last Name: </label>
                <MDBInput
                  id="lastname"
                  value={lastN}
                  required
                  type="text"
                  disabled
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Father's Name <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <MDBInput
                  id="fname"
                  type="text"
                  value={fatherName}
                  onChange={(e) => setfatherName(e.target.value)}
                  pattern="[A-Z][a-zA-Z ]+"
                  title="For example: Ramesh, First letter should be capital"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Mother's Name <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <MDBInput
                  id="mname"
                  type="text"
                  value={motherName}
                  onChange={(e) => setmotherName(e.target.value)}
                  pattern="[A-Z][a-zA-Z ]+"
                  title="For example: Anita, First letter should be capital"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Blood Group: </label>
                <MDBInput
                  id="bloodgroup"
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setbloodGroup(e.target.value)}
                  pattern="(A|B|AB|O)[+-]$"
                  title="For example: B+, There should be no gap b/w letter & +/-"
                  
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Department <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
              
                <select
                  className="form-control select2"
                  name="deptName"
                  id="deptName"
                  required
                  aria-hidden="true"
                  value={department}
                  onChange={(e) => setDepartmnet(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Applied Chemistry">Applied Chemistry</option>
                  <option value="Applied Physics">Applied Physics</option>
                  <option value="Applied Mathematics">Applied Mathematics</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Electronics Engineering">Electronics Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Petroleum Engineering">Petroleum Engineering</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Faculty Number <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <MDBInput
                  id="facultynum"
                  type="text"
                  value={faculty}
                  onChange={(e) => setFacultyNum(e.target.value)}
                  maxLength="8"
                  title="For example: 19COB001"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Roll Number <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <MDBInput
                  id="rollnum"
                  type="text"
                  value={rollNum}
                  onChange={(e) => setrollNum(e.target.value)}
                  pattern="[A-Z]+[0-9]{4}"
                  title="For example: A0231, First letter should be capital"
                  maxLength={5}
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>DOB <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
                <MDBInput
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Enrollment No <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
                <MDBInput
                  id="enrollnum"
                  type="text"
                  value={enrollNum}
                  onChange={(e) => setenrollNum(e.target.value)}
                  maxLength="6"
                  pattern="[A-Z][A-Z]+[0-9]{4}"
                  title="For example: GY6389, First two letters should be capital!"
                  required
                ></MDBInput>
              </MDBCol>

              <MDBCol>
                <MDBRow>
                  <label>Aadhaar No. <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                  <input
                    id="aadhar"
                    type={passwordType}
                    value={aadharNum}
                    onChange={(e) => setaadharNum(e.target.value)}
                    pattern="[0-9]+"
                    maxLength="12"
                    required
                  />
                  <button type="button" onClick={togglePassword}>
                  {passwordType === "password" ? (
                    <i class="fa-solid fa-eye"></i>
                  ) : (
                    <i class="fa-regular fa-eye"></i>
                  )}
                </button>
                </MDBCol>
                </MDBRow>

                
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="disability">
                  Disability <span style={{color: "red", fontSize:"20px"}}>*</span>:
                </label>
                <select
                  className="form-control select2"
                  name="disability"
                  id="disability"
                  required
                  aria-hidden="true"
                  value={disability}
                  onChange={(e) => setDisability(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Religion <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <select
                  className="form-control select2"
                  name="religion"
                  id="religion"
                  required
                  aria-hidden="true"
                  value={religion}
                  onChange={(e) => setreligion(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Budhist">Budhist</option>
                  <option value="other2">other</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Caste <span style={{color: "red", fontSize:"20px"}}>*</span>: </label>
                <select
                  className="form-control select2"
                  name="caste"
                  id="caste"
                  required
                  aria-hidden="true"
                  value={caste}
                  onChange={(e) => setcaste(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="GEN">GEN</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="GEN-EWS">GEN-EWS</option>
                  <option value="OBC">OBC</option>
                  <option value="other">other</option>
                </select>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="gender">
                  Gender <span style={{color: "red", fontSize:"20px"}}>*</span>:
                </label>
                <select
                  className="form-control select2"
                  name="gender"
                  id="gender"
                  required
                  aria-hidden="true"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Male">MALE</option>
                  <option value="Female">FEMALE</option>
                  <option value="Other">Other</option>
                </select>
              </MDBCol>
              <MDBCol>
                <label>Mobile Number<span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
                <PhoneInput
                  country={"in"}
                  value={mobNum}
                  onChange={setmobNum}
                />
              </MDBCol>
              <MDBCol>
                <label>Alternate Number</label>
                <PhoneInput
                  country={"in"}
                  value={alternateNum}
                  onChange={setalternateNum}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label className="required" htmlFor="disability">
                  Course Name <span style={{color: "red", fontSize:"20px"}}>*</span>:
                </label>
                <select
                  className="form-control select2"
                  name="course"
                  id="course"
                  required
                  aria-hidden="true"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E">B.E</option>
                  <option value="M.Tech">M.Tech</option>
                  
                </select>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ height: "40px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn
                  type="submit"
                  onClick={() => {
                    set_student_profile();
                  }}
                >
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
};

export default AddStudentProfile;
