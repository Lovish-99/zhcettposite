import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import { API_URL } from '../../../helper';

const ViewJobs = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      let result = await fetch(`${API_URL}/jobapi/get-job`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      setProfiles(result.data);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  const deleteUser = async (value) => {
    const companyName = value;
    setLoading2(true);
    await fetch(`${API_URL}/jobapi/delete-user`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        companyName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setLoading2(false);
          alert("job deleted succesfully!");
          navigate("/");
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
                  <MDBCardBody style={{ backgroundColor: "	#b2d8d8" }}>
                    <MDBRow>
                      <MDBCol md={10}>
                        <Link
                          to={`${item._id}/${item.companyName}`}
                          style={{ textDecoration: "none" }}
                        >
                          <MDBRow style={{ padding: "20px" }}>
                            <MDBCol md={8}>
                              <h1
                                style={{ color: "#004c4c", fontWeight: "bold" }}
                              >
                                {item.companyName}
                              </h1>
                              <h1 style={{ color: "#004c4c" }}>
                                {item.position}
                              </h1>
                            </MDBCol>
                            <MDBCol md={4} style={{ textAlign: "right" }}>
                              <h4 style={{ color: "#004c4c" }}>
                                {item.jobType}
                              </h4>
                              <h4>{item.stipend}/-</h4>
                              <h4 style={{ color: "grey" }}>
                                Closes {item.lastApplyDate}
                              </h4>
                            </MDBCol>
                          </MDBRow>
                        </Link>
                      </MDBCol>
                      <MDBCol>
                        <MDBRow>
                          <Link
                            to={`${item._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <MDBBtn> View Applies</MDBBtn>
                          </Link>
                        </MDBRow>
                        <MDBRow style={{ height: "5px" }} />
                        <MDBRow>
                          <MDBCol>
                            <>
                              {loading2 ? (
                                <MDBContainer
                                  className="mt-4"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <ReactLoading type="spin" color="#0000FF" height={70} width={40} />
                                </MDBContainer>
                              ) : (
                                <MDBBtn
                                  type="submit"
                                  onClick={() => deleteUser(item.companyName)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </MDBBtn>
                              )};
                            </>
                          </MDBCol>
                        </MDBRow>
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
                <MDBRow>
                  <MDBCol>
                    <h2>Ongoing Placement Companies</h2>
                  </MDBCol>
                  <MDBCol>
                    <Link to="/admin/addJob">
                      <MDBBtn>Add Job</MDBBtn>
                    </Link>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{ height: "40px" }} />

                <PaginatedItems itemsPerPage={3} />

                <MDBRow style={{ height: "40px" }} />
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default ViewJobs;
