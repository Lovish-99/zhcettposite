import React, { useEffect, useState } from 'react';
import {
    MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol,
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
    const [loading2, setLoading2] = useState(false);
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
    // function openBase64NewTab(base64Pdf) {
    function openBase64NewTab(base64Pdf) {
        var blob = base64toBlob(base64Pdf);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
        } else {
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl);
        }
    }

    function base64toBlob(base64Data) {
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: "application/pdf" });
    }

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
        setLoading2(true);

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
        setLoading2(false);
        alert("Job status updated successfully");
    };

    const items = applies;

    function Items({ currentItems }) {
        return (
            <>
                <form>
                    <MDBContainer>
                        <MDBRow>
                            <div className="table-responsive">
                                <MDBTable striped>
                                    <MDBTableHead>
                                        <tr>
                                            <th style={{ fontWeight: "bold" }}>Student Name</th>
                                            <th style={{ fontWeight: "bold" }}>Email</th>
                                            <th style={{ fontWeight: "bold" }}>Branch</th>
                                            <th style={{ fontWeight: "bold" }}>Resume</th>
                                            <th style={{ fontWeight: "bold" }}>Application Status</th>
                                            <th style={{ fontWeight: "bold" }}>Update Status</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {currentItems &&
                                            currentItems.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item.studentName}</td>
                                                    <td>{item.studentEmail}</td>
                                                    <td>{item.studentBranch}</td>
                                                    <td><MDBBtn
                                                        type="button"
                                                        onClick={() =>
                                                            openBase64NewTab(item.resume)
                                                        }
                                                    >
                                                        VIEW DOCUMENT
                                                    </MDBBtn></td>
                                                    <td>
                                                        <select
                                                            className="form-control"
                                                            value={applicationStatus}
                                                            onChange={(e) => setApplicationStatus(e.target.value)}
                                                            required
                                                        >
                                                            <option>{item.jobstatus}</option>
                                                            <option>selected</option>
                                                            <option>not selected</option>
                                                        </select>
                                                    </td>
                                                    <td>
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
                                                                    <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
                                                                </MDBContainer>
                                                            ) : (
                                                                <MDBBtn type='button' onClick={() => update_status({ item })}> Save </MDBBtn>
                                                            )};
                                                        </>
                                                    </td>
                                                </tr>
                                            ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </MDBRow>
                    </MDBContainer>
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
        <>{loading ? (
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
                                    <Link to="/recruiter/dashboard">
                                        <MDBBtn>Back</MDBBtn>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <PaginatedItems itemsPerPage={4} />
                            <MDBRow style={{ height: "20px" }} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </>
        )};
        </>
    )
}

export default ViewApplyJobScr
