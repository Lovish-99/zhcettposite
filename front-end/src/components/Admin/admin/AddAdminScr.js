import React, { useState } from "react";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import {API_URL} from '../../../helper';

const Addadmin = () => {
  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectData = (e) => {
    fetch(`${API_URL}/employapi/admin-register`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Admin added Successful");
          navigate("/admin/manageadmin");
        } else {
          alert("Something went wrong");
        }
      });
  }

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form>
                <MDBRow>
                  <MDBCol md={9}><h3>Sign Up</h3></MDBCol>
                  <MDBCol><Link to="/admin/manageadmin">Back</Link></MDBCol>
                </MDBRow>
                <hr/>
                <div className="mb-3">
                  <label>Admin Name<span style={{color: "red", fontSize:"20px"}}>*</span> :</label>
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
                  <label>Email<span style={{color: "red", fontSize:"20px"}}>*</span> :</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password<span style={{color: "red", fontSize:"20px"}}>*</span> :</label>
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
                  <button type="button" className="btn btn-primary"
                    onClick={() => collectData()}>
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
              <MDBCardImage src="../../training.jpeg" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Addadmin;
