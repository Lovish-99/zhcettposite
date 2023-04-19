import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import './testing.css';
import {API_URL} from '../../../helper';

function ImportCsv() {
    const [file, setFile] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`${API_URL}/enroll/import-csv`, formData)
            .then((response) => {
                console.log(response.data);
                alert("File Updated Successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <MDBContainer>
                <MDBCard className="text-black m-5" style={{ borderRadius: "0px"}}>
                    <MDBCardBody>
                        <h2 className='text-center'>Upload Student Enrollment Data CSV File:</h2>
                        <form className='wrapperForm' onSubmit={handleSubmit}>
                            <MDBRow>
                                <MDBCol>
                                    <input type="file" name="file" className='file-input' onChange={handleFileChange} />
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn><i className="fa-solid fa-cloud-arrow-up"></i></MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow style={{ height: "20px" }} />
                            <p className='wrapperP'>Browse File to Upload</p>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default ImportCsv;
