import Table from "react-bootstrap/Table";
import React from "react";
import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [firstN, setFirst] = useState("");
  const [middleN, setMiddle] = useState("");
  const [lastN, setLast] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      setFirst(JSON.parse(localStorage.getItem("student")).firstName);
      setMiddle(JSON.parse(localStorage.getItem("student")).middleName);
      setLast(JSON.parse(localStorage.getItem("student")).lastName);
      let result = await fetch(
        `${API_URL}/dataapi/add-data/${idd}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      setProfiles(result.data.data.stdprofile);
      localStorage.setItem(
        "stdprofile",
        JSON.stringify(result.data.data.stdprofile)
      );
      setLoading(false);
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
                    <h3 className="text-center">PROFILE</h3>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <Table striped>
                      <tbody>
                        <tr>
                          <td>Name :</td>
                          <td>
                            {firstN} {middleN} {lastN}
                          </td>
                        </tr>
                        <tr>
                          <td>Father's Name :</td>
                          <td>{profiles.fatherName}</td>
                        </tr>
                        <tr>
                          <td>Mother's Name :</td>
                          <td>{profiles.motherName}</td>
                        </tr>
                        <tr>
                          <td>Faculty Number :</td>
                          <td>{profiles.faculty}</td>
                        </tr>
                        <tr>
                          <td>Enrollment Number :</td>
                          <td>{profiles.enrollNum}</td>
                        </tr>
                        <tr>
                          <td>D.O.B :</td>
                          <td>{profiles.dob}</td>
                        </tr>
                        <tr>
                          <td>Gender :</td>
                          <td>{profiles.gender}</td>
                        </tr>
                        <tr>
                          <td>Aadhaar Number :</td>
                          <td>{profiles.aadharNum}</td>
                        </tr>
                        <tr>
                          <td>Course Name :</td>
                          <td>{profiles.course}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </MDBCol>
                  <MDBCol>
                    <Table striped>
                      <tbody>
                        <tr>
                          <td>Roll Number :</td>
                          <td>{profiles.rollNum}</td>
                        </tr>
                        <tr>
                          <td>Blood Group :</td>
                          <td>{profiles.bloodGroup}</td>
                        </tr>
                        <tr>
                          <td>Disability :</td>
                          <td>{profiles.disability}</td>
                        </tr>
                        <tr>
                          <td>Caste :</td>
                          <td>{profiles.caste}</td>
                        </tr>
                        <tr>
                          <td>Religion :</td>
                          <td>{profiles.religion}</td>
                        </tr>
                        <tr>
                          <td>Mobile NUmber :</td>
                          <td>{profiles.mobNum}</td>
                        </tr>
                        <tr>
                          <td>Alternate Number :</td>
                          <td>{profiles.alternateNum}</td>
                        </tr>
                        <tr>
                          <td>Department: </td>
                          <td>{profiles.department}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </MDBCol>
                </MDBRow>

                <MDBRow style={{ height: "20px" }}></MDBRow>
                <MDBRow>
                  <MDBCol>
                    <Link to="/student/editstdprofile">
                      <MDBBtn>Edit</MDBBtn>
                    </Link>
                  </MDBCol>
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

export default Profile;
