import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import QRCode from "react-qr-code";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const MangStudent = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [cpi, setCpi] = useState("");
  const [faculty, setFaculty] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      await fetch(`${API_URL}/dataapi/get-student/`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfiles(data.data.data);
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  };

  const deleteUser = async (value) => {
    const email = value;
    fetch(`${API_URL}/dataapi/delete-user`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("user delected succesfully!");
        }
      });
  };
  const items = profiles;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item._id}>
              <form>
                <MDBCard style={{ borderRadius: "0px" }}>
                  <MDBCardBody>
                    <MDBRow style={{ padding: "20px" }}>
                      <MDBCol md={11}>
                        <MDBRow>
                          <MDBCol md={2}>
                            <img
                              src={item.picture.picture[0]["dataImage"]}
                              alt="pic"
                              style={{
                                borderRadius: "25px solid",
                                height: "200px",
                              }}
                            />
                          </MDBCol>
                          <MDBCol md={8}>
                            <h6>Name: {item.username}</h6>
                            <h6>Branch: {item.stdprofile.department}</h6>
                            <h6>Faculty No: {item.stdprofile.faculty}</h6>
                            <h6>Enrollment No: {item.stdprofile.enrollNum}</h6>
                            <h6>Department : {item.stdprofile.department}</h6>
                            <h6>Course : {item.stdprofile.course}</h6>
                            <h6>Contact: {item.stdprofile.mobNum}</h6>
                            <h6>Email: {item.email}</h6>
                            <h6>Skills: </h6>
                            <h6>CPI: </h6>
                          </MDBCol>
                          <MDBCol md={2}>
                            <QRCode
                              size={256}
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                width: "70%",
                              }}
                              value="0"
                              viewBox={`0 0 256 256`}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol>
                        <MDBBtn
                          type="submit"
                          onClick={() => deleteUser(item.email)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBRow style={{ height: "10px" }} />
              </form>
            </div>
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
                <form>
                  <MDBRow>
                    <MDBCol>
                      <select
                        className="form-control select2"
                        name="course"
                        id="course"
                        required
                        aria-hidden="true"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                      >
                        <option value="">Please select</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.E">B.E</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </MDBCol>
                    <MDBCol>
                      <select
                        className="form-control select2"
                        name="deptName"
                        id="deptName"
                        required
                        aria-hidden="true"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="document">Select Department</option>
                        <option value="Applied Chemistry">
                          Applied Chemistry
                        </option>
                        <option value="Applied Physics">Applied Physics</option>
                        <option value="Applied Mathematics">
                          Applied Mathematics
                        </option>
                        <option value="Architecture">Architecture</option>
                        <option value="Chemical Engineering">
                          Chemical Engineering
                        </option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                        <option value="Computer Engineering">
                          Computer Engineering
                        </option>
                        <option value="Electronics Engineering">
                          Electronics Engineering
                        </option>
                        <option value="Electrical Engineering">
                          Electrical Engineering
                        </option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Petroleum Engineering">
                          Petroleum Engineering
                        </option>
                      </select>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="fname"
                        label="Faculty Number:"
                        type="text"
                        maxLength="8"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                      ></MDBInput>
                    </MDBCol>

                    <MDBCol>
                      <MDBInput
                        id="fname"
                        label="CPI:"
                        type="text"
                        pattern="[0-9]+"
                        value={cpi}
                        onChange={(e) => setCpi(e.target.value)}
                      ></MDBInput>
                    </MDBCol>
                    <MDBCol>
                      <Link
                        to={`${course}/${department}/${faculty}`}
                        style={{ textDecoration: "none" }}
                      >
                        <MDBBtn>Search</MDBBtn>
                      </Link>
                    </MDBCol>
                  </MDBRow>
                </form>
                <hr />
                <MDBRow style={{ height: "40px" }} />

                <PaginatedItems itemsPerPage={4} />

                <MDBRow style={{ height: "40px" }} />
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default MangStudent;