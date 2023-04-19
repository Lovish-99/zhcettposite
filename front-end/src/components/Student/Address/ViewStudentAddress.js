import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const ViewStudentAddress = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [peraddresses, setPeraddress] = useState([]);
  const [tempaddresses, setTempaddress] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPerAddress();
    getTempAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPerAddress = async () => {
    if (authorize) {
      setLoading(true);
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      let result = await fetch(
        `${API_URL}/dataapi/add-data/${idd}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      setPeraddress(result.data.data.stdperadd);
      localStorage.setItem(
        "stdperaddress",
        JSON.stringify(result.data.data.stdperadd)
      );
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  const getTempAddress = async () => {
    if (authorize) {
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      let result = await fetch(
        `${API_URL}/dataapi/add-data/${idd}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      setTempaddress(result.data.data.stdtempadd);
      localStorage.setItem(
        "stdtempadd",
        JSON.stringify(result.data.data.stdtempadd)
      );
    } else {
      navigate("/");
    }
  };

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
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <h3 className="text-center">Address</h3>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCard
                      className="text-black m-5"
                      style={{ borderRadius: "0px" }}
                    >
                      <MDBCardBody>
                        <h5>Permanent Address</h5>
                        <hr />

                        <Table striped>
                          <tbody>
                            <tr>
                              <td>Address :</td>
                              <td>
                                {peraddresses.flatNo}, {peraddresses.area},{" "}
                                {peraddresses.landmark}
                              </td>
                            </tr>
                            <tr>
                              <td>Country :</td>
                              <td>{peraddresses.country}</td>
                            </tr>
                            <tr>
                              <td>Province :</td>
                              <td>{peraddresses.province}</td>
                            </tr>
                            <tr>
                              <td>City :</td>
                              <td>{peraddresses.city}</td>
                            </tr>
                            <tr>
                              <td>Postal Code :</td>
                              <td>{peraddresses.postalCode}</td>
                            </tr>
                          </tbody>
                        </Table>

                        <MDBRow>
                          <MDBCol>
                            <Link to="/student/editstdperaddress">
                              <MDBBtn>Edit</MDBBtn>
                            </Link>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol>
                    <MDBCard
                      className="text-black m-5"
                      style={{ borderRadius: "0px" }}
                    >
                      <MDBCardBody>
                        <h5>Corresponding Address</h5>
                        <hr />
                        <Table striped>
                          <tbody>
                            <tr>
                              <td>Address :</td>
                              <td>
                                {tempaddresses.flatNo}, {tempaddresses.area},{" "}
                                {tempaddresses.landmark}
                              </td>
                            </tr>
                            <tr>
                              <td>Country :</td>
                              <td>{tempaddresses.country}</td>
                            </tr>
                            <tr>
                              <td>Province :</td>
                              <td>{tempaddresses.province}</td>
                            </tr>
                            <tr>
                              <td>City :</td>
                              <td>{tempaddresses.city}</td>
                            </tr>
                            <tr>
                              <td>Postal Code :</td>
                              <td>{tempaddresses.postalCode}</td>
                            </tr>
                          </tbody>
                        </Table>

                        <MDBRow>
                          <MDBCol>
                            <Link to="/student/editstdtempaddress">
                              <MDBBtn>Edit</MDBBtn>
                            </Link>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <Link to="/student/dashboard">
                      <MDBBtn>Back</MDBBtn>
                    </Link>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default ViewStudentAddress;
