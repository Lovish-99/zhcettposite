import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardImage,
} from "mdb-react-ui-kit";
import {API_URL} from '../../../helper';
import ReactLoading from "react-loading";

const CompanyRegister = () => {
  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const collectData = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(`${API_URL}/employapi/comp-register`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
          setLoading(false);
          console.log(data.data.company);
          localStorage.setItem("recruiter", JSON.stringify(data.data.company));
          localStorage.setItem("token", JSON.stringify(data.data.token));
          navigate("/addCompanyDetails");
        } else {
          alert("Something went wrong");
        }
      });
  }

  const getOTP = () => {
    fetch(`${API_URL}/employapi/generate-token`, {
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
  }

  const verifyMail = () => {
    fetch(`${API_URL}/employapi/verify-token`, {
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
  }

  return (
    <MDBContainer >
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
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={collectData}>
                <h3>Sign Up FOR RECRUITERS </h3>

                <div className="mb-3">
                  <label>Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={username}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Business Email</label>
                  <MDBRow>
                    <MDBCol md={9}>
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
                    <MDBCol md={9}>
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

                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={show}
                    className="btn btn-primary"
                    
                  >
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/complogin">sign in?</a>
                </p>
              </form>
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src="./training.jpeg" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default CompanyRegister;
