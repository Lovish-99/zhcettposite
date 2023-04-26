import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const StudentDashboard = () => {
  const authorize = JSON.parse(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [data, setData] = useState([]);
  let [jobData, setJobData] = useState([]);
  const navigate = useNavigate();
  const [photo, setphoto] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    if (authorize) {
      setLoading(true);
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      await fetch(`${API_URL}/dataapi/add-data/${idd}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setEmail(data.data.data.email);
            setName(data.data.data.username);
            setData(data.data.data.stdprofile);
            const photo2 = data.data.data.picture.picture[0];
            setphoto(photo2["dataImage"]);
          } else {
            alert("something is wrong");
          }
        });

      await fetch(`${API_URL}/applyjobapi/find-job-applied/${idd}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setJobData(data.data);
          }
        });
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <MDBContainer className="mt-4" style={{display:'flex', justifyContent:'center', alignItems:'center'}} > 
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </MDBContainer>
      ) : (
        <>
          <MDBContainer>
            <MDBCard className="text-black m-5">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md={3}>
                    <img
                      src={`data:application/image;base64,${photo}`}
                      alt="img"
                      style={{ borderRadius: "25px solid", height: "200px" }}
                    />
                  </MDBCol>
                  <MDBCol md={9}>
                    <MDBRow>
                      <h3>{username}</h3>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBCol md={6}>
                        <h6>Faculty Number : {data.faculty}</h6>
                        <h6>Course Name : {data.course}</h6>
                        <h6>Department : {data.department}</h6>
                      </MDBCol>
                      <MDBCol md={6}>
                        <h6>
                          <i className="fa-solid fa-envelope"></i> Email :{" "}
                          {email}
                        </h6>
                        <h6>
                          <i className="fa-solid fa-phone"></i> Contact No :{" "}
                          {data.mobNum}
                        </h6>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="text-black m-5">
              <MDBCardBody>
                {/* 1st row */}
                <div className="table-responsive">
                <MDBTable striped>
                  <MDBTableHead>
                    <tr>
                      <th>Company Name</th>
                      <th>Postition</th>
                      <th>Job Type</th>
                      {/* <th>Apply By</th> */}
                      <th>Application status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {jobData.map((item) => (
                      <tr key={item._id}>
                        <td>{item.companyName}</td>
                        <td>{item.position}</td>
                        <td>{item.jobtype}</td>
                        {/* <td>-</td> */}
                        <td>{item.jobstatus}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default StudentDashboard;
