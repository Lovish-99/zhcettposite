import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBTable,
  MDBTableBody,
  MDBCardBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import {API_URL} from '../../../helper';

const MangRecruiter = () => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiles = async () => {
    if (auth) {
      setLoading(true);
      await fetch(`${API_URL}/employapi/get-recruit/`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setProfiles(data.data);
            setLoading(false);
          }
        });
    } else {
      navigate("/");
    }
  };

  const deleteUser = async (value) => {
    const email = value;
    setLoading(true);
    await fetch(`${API_URL}/employapi/delete-user`, {
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
          setLoading(false);
          alert("user delected succesfully!");
        }
      });
  };

  const items = profiles;
  function Items({ currentItems }) {
    return (
      <>
        <form>
        <div className="table-responsive">
          <MDBTable striped >
            <MDBTableHead >
              <tr>
                <th style={{ fontWeight: "bold" }}>Company Name</th>
                <th style={{ fontWeight: "bold" }}>Email</th>
                <th style={{ fontWeight: "bold" }}>Created At</th>
                <th style={{ fontWeight: "bold" }}>Remove</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {currentItems &&
                currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.created_at}</td>
                    <td>
                      <MDBBtn
                        type="submit"
                        onClick={() => deleteUser(item.email)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
          </div>
        </form>
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
          <MDBContainer fluid>
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <PaginatedItems itemsPerPage={4} />
                <MDBRow style={{ height: "20px" }}></MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default MangRecruiter;
