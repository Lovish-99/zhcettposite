import React, { useEffect } from "react";
import {
  MDBRow, MDBCol, MDBBtnGroup, MDBCard, MDBCardBody,
} from "mdb-react-ui-kit";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Nabvar from "../Main/navbar/Navbar";

function Student() {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const status = localStorage.getItem("onetimeform");

  useEffect(() => {
    if (!authorize) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colordiv1 = () => {
    if (localStorage.getItem("stdprofile")) {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px", backgroundColor: "lightblue" }} />
      );
    } else {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px" }}></div>
      );
    }
  };
  const colordiv2 = () => {
    if (localStorage.getItem("picresume")) {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px", backgroundColor: "lightblue" }} />
      );
    } else {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px" }}></div>
      );
    }
  };
  const colordiv3 = () => {
    if (localStorage.getItem("stdperaddress")) {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px", backgroundColor: "lightblue" }} />
      );
    } else {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px" }}></div>
      );
    }
  };
  const colordiv4 = () => {
    if (localStorage.getItem("stdqualify")) {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px", backgroundColor: "lightblue" }} />
      );
    } else {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px" }}></div>
      );
    }
  };
  const colordiv5 = () => {
    if (localStorage.getItem("upload")) {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px", backgroundColor: "lightblue" }} />
      );
    } else {
      return (
        <div id="myBar" className="w3-green" style={{ height: "10px" }}></div>
      );
    }
  };
  return (
    <>
      <Nabvar />
      <MDBRow>
        <MDBCol>
          <MDBCard style={{ borderRadius: "0px" }}>
            <MDBCardBody>
              <h2 className="text-center bg-success text-bg-dark p-2">
                Student PANEL
              </h2>
              <MDBRow>
                <MDBRow style={{ height: "40px" }}></MDBRow>
                <MDBBtnGroup horizontal="true" style={{ padding: "10px" }}>
                  <MDBCol md={2} style={{ textAlign: "center" }}>
                    <i className="fa-regular fa-circle"> Profile</i>
                    {colordiv1()}
                  </MDBCol>

                  <MDBCol md={2} style={{ textAlign: "center" }}>
                    <i className="fa-regular fa-circle"> picture</i>
                    {colordiv2()}
                  </MDBCol>

                  <MDBCol md={2} style={{ textAlign: "center" }}>
                    <i className="fa-regular fa-circle"> Address</i>
                    {colordiv3()}
                  </MDBCol>

                  <MDBCol md={3} style={{ textAlign: "center" }}>
                    <i className="fa-regular fa-circle"> Qualification</i>
                    {colordiv4()}
                  </MDBCol>

                  <MDBCol md={3} style={{ textAlign: "center" }}>
                    <i className="fa-regular fa-circle"> Documents</i>
                    {colordiv5()}
                  </MDBCol>
                </MDBBtnGroup>
              </MDBRow>

              <MDBRow>
                {
                  status ? <Outlet />
                    : <Navigate to="/student/dashboard" />
                }
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Student;
