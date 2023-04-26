import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Nabvar from '../../Main/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Footer from '../../Main/footer/footer';
import { API_URL } from '../../../helper';

const ResetPass = () => {
    const [nextButton, setnextbutton] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const authorize = localStorage.getItem("token");
    useEffect(() => {
        if (authorize) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const NextButton = () => {
        navigate("/change-password");
    };
    const sendEmail = async (e) => {
        try {
            e.preventDefault();

            const res = await fetch(`${API_URL}/userapi/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            // Display the success message and ask for the token and new password
            setMessage(res.msg);
            setnextbutton(false);
            setShow(true)
        } catch (err) {
            setMessage('Error changing password');
        }
    }

    return (
        <>
            <Nabvar />
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Succesfully Send
                </Alert> : <Alert>{message}</Alert>
            }
            <div className="container mt-5" style={{ textAlign: "center", padding: "20px", minHeight: "60vh" }}>
                <MDBCard style={{ borderRadius: "0px", padding: "20px" }}>
                    <MDBCardBody>
                        <i className='fa-solid fa-envelope fa-2xl mb-5'></i>
                        <MDBRow>
                            <h2 style={{ color: "red" }}>Send Email on registered Email</h2>
                        </MDBRow>
                        <div className="d-flex justify-content-center">
                            <Form className='mt-2 col-lg-6'>
                                <MDBRow>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" name='email' value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                </MDBRow>
                                <MDBRow>
                                    <Button variant="primary" type="submit" onClick={sendEmail}>
                                        Get Reset Mail
                                    </Button>
                                </MDBRow>
                                <MDBRow className='mt-4'></MDBRow>
                                <MDBRow>
                                    <MDBCol md={4}>
                                        <Link to="/login">
                                            <Button type="button">Login</Button>
                                        </Link>
                                    </MDBCol>
                                    <MDBCol style={{ height: "10px" }}></MDBCol>
                                    <MDBCol md={4}>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                NextButton();
                                            }}
                                            disabled={nextButton}
                                        >
                                            Next
                                        </Button>
                                    </MDBCol>
                                </MDBRow>

                            </Form>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <Footer />
        </>
    )
}

export default ResetPass