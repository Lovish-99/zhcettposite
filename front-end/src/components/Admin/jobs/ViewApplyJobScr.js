import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTable,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import { API_URL } from '../../../helper';

const ViewApplyJobScr = () => {
  let { id } = useParams();
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    if (authorize) {
      setLoading(true);
      await fetch(`${API_URL}/applyjobapi/find-job-bycomp/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setApplies(data.data);
            setLoading(false);
          }
        });
    } else {
      navigate("/");
    }
  };

  const update_status = async (data) => {
    let jobId = data.item.jobId;
    let studentId = data.item.studentId;
    let studentName = data.item.studentName;
    let studentBranch = data.item.studentBranch;
    let studentEmail = data.item.studentEmail;
    let resume = data.item.resume;
    let recruiterId = data.item.recruiterId;
    let email = data.item.email;
    let recruiterName = data.item.recruiterName;
    let mobile = data.item.mobile;
    let companyName = data.item.companyName;
    let position = data.item.position;
    let jobtype = data.item.jobType;
    let jobstatus = applicationStatus;

    await fetch(`${API_URL}/applyjobapi/update-student-job-status/${jobId}/${studentId}`, {
      method: "put",
      body: JSON.stringify({
        jobId,
        recruiterId,
        recruiterName,
        email,
        mobile,
        studentBranch,
        studentEmail,
        resume,
        studentName,
        studentId,
        companyName,
        position,
        jobtype,
        jobstatus,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });

    await fetch(`${API_URL}/mailapi/notify-jobstatus-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentEmail,
        position,
        companyName,
        studentName,
      })
    });

    alert("job status updated succesfully");
  };

  const items = applies;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <MDBRow key={item._id}>
              <MDBCard >
                <MDBCardBody>
                  <MDBRow >
                    <MDBCol>
                      <div className="table-responsive">
                        <MDBTable striped>
                          <tbody>
                            <tr>
                              <td>Comapany Name</td>
                              <td>{item.companyName}</td>
                            </tr>
                            <tr>
                              <td>Recruiter Name</td>
                              <td>{item.recruiterName}</td>
                            </tr>
                            <tr>
                              <td>Recruiter Email</td>
                              <td>{item.email}</td>
                            </tr>
                            <tr>
                              <td>Recruiter Number</td>
                              <td>{item.mobile}</td>
                            </tr>
                            <tr>
                              <td>Job Position </td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </MDBTable>
                      </div>
                    </MDBCol>
                    <MDBCol>
                      <div className="table-responsive">
                        <MDBTable striped>
                          <tbody>
                            <tr>
                              <td>Student Name</td>
                              <td>{item.studentName}</td>
                            </tr>
                            <tr>
                              <td>Student Email</td>
                              <td>{item.studentEmail}</td>
                            </tr>
                            <tr>
                              <td>Student Branch</td>
                              <td>{item.studentBranch}</td>
                            </tr>
                            <tr>
                              <td>Job Status</td>
                              <td>
                                <select
                                  className="form-control"
                                  value={applicationStatus}
                                  onChange={(e) =>
                                    setApplicationStatus(e.target.value)
                                  }
                                  required
                                >
                                  <option>{item.jobstatus}</option>
                                  <option>selected</option>
                                  <option>not selected</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>Update Job Status</td>
                              <td>
                                <MDBBtn type='button' onClick={() => update_status({ item })}> Save </MDBBtn>
                              </td>
                            </tr>
                          </tbody>
                        </MDBTable>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBRow style={{ height: "20px" }} />
            </MDBRow>
          ))}
        <MDBRow style={{ height: "40px" }} />
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        <MDBRow style={{ paddingLeft: "35%" }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </MDBRow>
      </>
    );
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
          <MDBContainer>
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol><h1>Applied by :</h1></MDBCol>
                  <MDBCol>
                    <Link to="/admin/viewJob">
                      <MDBBtn>Back</MDBBtn>
                    </Link>
                  </MDBCol>
                </MDBRow>
                <hr />
                <PaginatedItems itemsPerPage={3} />

              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default ViewApplyJobScr;
