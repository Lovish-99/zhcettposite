import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {API_URL} from '../../../helper';

const ChangeStudentPass = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  
  const handleResetPassword = async () => {
    try {
      // Validate the token and new password before sending the POST request to reset the password
      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      const res = await fetch(`${API_URL}/userapi/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      setMessage(res.msg);
      setToken("");
      setShow(true)
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage("Error resetting password");
      alert(message);
    }
  };
  return (
    <>
      {
        show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          Your Password Changed Succesfully
        </Alert> : ""
      }
      <MDBRow>
        <MDBCol></MDBCol>
        <MDBCol>
          <MDBCard style={{ borderRadius: "0px", padding: "20px" }} className="mt-4">
            <MDBCardBody>
              <div className="container mt-2">
                <div className="d-flex justify-content-center">
                  <h2>CHANGE PASSWORD</h2>
                </div>
                <div className="d-flex justify-content-center">
                  <Form className="mt-2 col-lg-6">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Token</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => handleResetPassword()}
                    >
                      Send
                    </Button>
                  </Form>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
    </>
  );
};

export default ChangeStudentPass;
