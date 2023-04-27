import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBBtn,
} from "mdb-react-ui-kit";
import {API_URL} from '../../../helper';
import ReactLoading from "react-loading";

const StudentRegister = () => {
  var [enroll, setEnroll] = useState();
  const [optionList, setOptionList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var uploads = [];
  var sett = [];

  useEffect(() => {
    getEnroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getEnroll = () => {
    fetch(`${API_URL}/userapi/enroll`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          sett = data.data.data;
          const l = sett.length;

          var i;
          for (i = 0; i < l; i++) {
            uploads.push({
              value: sett[i]["Enroll"],
              label: sett[i]["Enroll"],
            });
          }
          setOptionList(uploads);
        } else {
          alert("Something went wrong");
        }
      });
  };
  function handleSelect(data) {
    setEnroll(data);
  }
  const collectData = () => {
    setLoading(true);
    enroll= enroll.value
    console.log(enroll)
    fetch(`${API_URL}/userapi/register`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        enroll,
        email,
        password,
        passwordConfirm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("student", JSON.stringify(data.data.student));
          localStorage.setItem("token", JSON.stringify(data.data.token));
          localStorage.setItem("onetimeform", "ok");
          alert("Registration Successful");
          setLoading(false);
          navigate("/onetimeform/addstdprofile");
        } else {
          alert("Something went wrong");
        }
      });
  };

  const getOTP = () => {
    fetch(`${API_URL}/userapi/generate-token`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("OTP Send Successfully");
        } else {
          alert("Something went wrong");
        }
      });
  };
  
  const verifyMail = () => {
    fetch(`${API_URL}/userapi/verify-token`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Email Verified Successfully");
          setShow(false);
        } else {
          alert("Something went wrong");
        }
      });
  };



  return (
    <>
      <MDBContainer>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
            {loading ? (
                <ReactLoading
                  type="spin"
                  color="#0000FF"
                  height={100}
                  width={50}
                />
              ) : null}
              {/* 1st half part of the register page */}
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <form>
                  <h3>Sign Up FOR STUDENTS</h3>
                  <div className="mb-3">
                    <label>First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Middle name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Middle name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enrollment No</label>
                    <div className="dropdown-container">
                      <Select
                        options={optionList}
                        placeholder="Select Enrollment Number"
                        value={enroll}
                        onChange={handleSelect}
                        isSearchable={true}
                       
                        required
                      >
                      </Select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Email address</label>
                    <MDBRow>
                      <MDBCol md={7}>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </MDBCol>
                      <MDBCol>
                        <MDBBtn onClick={() => getOTP()}>Get OTP</MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  {/* email verification part */}
                  <div className="mb-3">
                    <label>Enter Token</label>
                    <MDBRow>
                      <MDBCol md={7}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Generated Token"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          required
                        />
                      </MDBCol>
                      <MDBCol>
                        <MDBBtn onClick={() => verifyMail()}>Verify</MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                    />
                  </div>

                  {/* submit button of the register page */}
                  <div className="d-grid">
                    <button
                      type="button"
                      disabled={show}
                      className="btn btn-primary"
                      onClick={collectData}
                    >
                      Sign Up
                    </button>
                  </div>
                  <p className="forgot-password text-right">
                    Already registered <a href="/stdlogin">sign in?</a>
                  </p>
                  {/* 1st half part ends here */}
                </form>
              </MDBCol>

              {/* 2nd half part of the register page */}
              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src="./training.jpeg" fluid />
                {/* 2nd half part ends here */}
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default StudentRegister;
