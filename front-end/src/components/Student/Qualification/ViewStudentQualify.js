import React from 'react';
import {
    MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBTable, MDBRow, MDBCol, MDBTableBody
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const ViewStudentQualify = () => {
    const authorize = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [qualifies, setQualify] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getQualify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getQualify = async () => {
        if (authorize) {
            setLoading(true);
            const idd = JSON.parse(localStorage.getItem("student"))._id;
            let result = await fetch(`${API_URL}/dataapi/add-data/${idd}`, {
                headers: {
                    "authorization": JSON.parse(localStorage.getItem("token")),
                },
            });
            result = await result.json();
            setQualify(result.data.data.stdeducat);
            localStorage.setItem("stdqualify", JSON.stringify(result.data.data.stdeducat));
            setLoading(false);
        }
        else {
            navigate("/");
        }
    }

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
        <MDBContainer >
            <MDBCard className='text-black m-5'>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol><h3 className="text-center">Academic Qualification List</h3></MDBCol>
                        {/* <MDBCol>
                            <Link to="/student/dashboard">
                                <MDBBtn>Back</MDBBtn>
                            </Link>
                        </MDBCol> */}
                    </MDBRow>
                    <hr />
                    {
                        qualifies.map((item) =>
                            <MDBRow key={item._id}>
                                <MDBCol md={2} style={{ textAlign: 'center', paddingTop: "10%" }}>{item.qualifyLevel}</MDBCol>

                                <MDBCol md={10}>
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBTable striped>
                                                <MDBTableBody>
                                                    <tr>
                                                        <td>Qualification Level :</td>
                                                        <td>{item.qualifyLevel}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>School Name :</td>
                                                        <td>{item.qualifyName}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Area of study :</td>
                                                        <td>-</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Roll Number:</td>
                                                        <td>{item.rollNum}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pass Year :</td>
                                                        <td>{item.passYear}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Action :</td>
                                                        <td><Link to={`/student/editstdqualify/${item._id}`}><MDBBtn>Edit</MDBBtn></Link></td>
                                                    </tr>
                                                </MDBTableBody>
                                            </MDBTable>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBTable striped>
                                                <MDBTableBody>
                                                    <tr>
                                                        <td>Board Name:</td>
                                                        <td>{item.board}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Grading System : :</td>
                                                        <td>{item.gradeSys}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Grade:</td>
                                                        <td>{item.grade}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Result:</td>
                                                        <td>{item.resultStatus}</td>
                                                    </tr>

                                                </MDBTableBody>
                                            </MDBTable>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <hr />
                            </MDBRow>
                        )
                    }
                </MDBCardBody>
            </MDBCard>
        </MDBContainer >
        </>
        )}
      </>
    )
}

export default ViewStudentQualify;
