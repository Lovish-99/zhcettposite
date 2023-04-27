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
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import QRCode from "react-qr-code";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const MangStudent = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const { department, faculty, course } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      await fetch(
        `${API_URL}/dataapi/get-student/${course}/${department}/${faculty}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProfiles(data.data.data);
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  };

  const download = async () => {
    const response = await fetch(`${API_URL}/dataapi/download-csv/${course}/${department}/${faculty}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const items = profiles;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item._id}>
              <MDBCard style={{ borderRadius: "0px" }}>
                <MDBCardBody>
                  <MDBRow style={{ padding: "20px" }}>
                    <MDBCol md={2}>
                      <img
                        src={`data:application/image;base64,${item.picture.picture[0]["dataImage"]}`}
                        alt="pic"
                        style={{ borderRadius: "25px solid", height: "200px" }}
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
                </MDBCardBody>
              </MDBCard>
              <MDBRow style={{ height: "10px" }} />
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
                <h1>Filtered Student Data:</h1>
                <hr />
                <MDBRow style={{ height: "20px" }} />

                <PaginatedItems itemsPerPage={4} />

                <MDBRow style={{ height: "40px" }} />
                <MDBRow style={{ height: "20px" }}></MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBBtn onClick={() => download()}>Download File</MDBBtn>
                  </MDBCol>
                  <MDBCol>
                    <Link to="/admin/managestd">
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

export default MangStudent;
