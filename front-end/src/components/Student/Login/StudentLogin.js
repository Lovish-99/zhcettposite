import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../../Main/login.css";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let userId = "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlelogin = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(`${API_URL}/userapi/login`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("student", JSON.stringify(data.data.user));
          localStorage.setItem("token", JSON.stringify(data.data.token));

          console.log(data.data.user._id);
          userId = data.data.user._id;
          console.log(userId);
          getStudentData();
        } else {
          alert("something is wrong!");
        }
      });
  };

  const getStudentData = async () => {
    fetch(`${API_URL}/dataapi/add-data/${userId}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          localStorage.setItem("form", "ok");
        } else {
          localStorage.setItem("onetimeform", "ok");
        }
        setLoading(false);
        alert("login successful");
        navigate("/");
      });
  };

  return (
    <>
      <MDBContainer
        className="my-5 gradient-form"
      >
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
              {/* <p>{loading ? <>Loading..</> : <></>}</p> */}
              {/* 1st half part of the login api */}
              <MDBCol col="6" className="mb-5">
                <form onSubmit={handlelogin}>
                  <h3
                    style={{
                      color: "teal",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Sign In FOR STUDENTS
                  </h3>

                  <div className="mb-3">
                    <label>Email address</label>
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
                    <div className="custom-control custom-checkbox">
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        <Link to="/reset-password">Forget Password</Link>
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <p className="forgot-password text-center">
                    New Register?
                    <a href="/stdregister"> Sign Up</a>
                  </p>
                </form>
              </MDBCol>
              {/* 1st half part end here */}

              {/* 2nd half part of the login api */}
              <MDBCol col="6" className="mb-5">
                <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">
                      Training and Placement Portal For Students
                    </h4>
                    <p className="small mb-0">
                      Students can login here and providing their personal
                      details, academic qualifications and other details related
                      to the placement.
                    </p>
                  </div>
                </div>
              </MDBCol>
              {/* 2nd half part end here */}
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default StudentLogin;
