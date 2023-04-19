import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  MDBRow, MDBCard, MDBCardBody, MDBContainer
} from 'mdb-react-ui-kit';
import Alert from 'react-bootstrap/Alert';
import {API_URL} from '../../../helper';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [messag, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      const message = "Name of the Company: " + name +  "\n\n" + "Recruiter Message: " + messag;

      await fetch(`${API_URL}/mailapi/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to,
          subject,
          message
        })
      });
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {
        show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          Your Email Succesfully Send
        </Alert> : ""
      }

      <MDBContainer className='mt-4'>
        <MDBCard>
          <MDBCardBody  >
            <Form onSubmit={sendEmail}>
              <Form.Group controlId="formBasicEmail" >
                <Form.Label style={{color:"black" , fontWeight:"bolder"}}>Company Name<span style={{color: "red", fontSize:"20px"}}>*</span> :</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{color:"black" , fontWeight:"bolder"}}>Your Email<span style={{color: "red", fontSize:"20px"}}>*</span> :</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                  value={to} onChange={(e) => setTo(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicSubject">
                <Form.Label style={{color:"black" , fontWeight:"bolder"}}>Subject<span style={{color: "red", fontSize:"20px"}}>*</span> :</Form.Label>
                <Form.Control type="text" placeholder="Enter subject"
                  value={subject} onChange={(e) => setSubject(e.target.value)} required/>
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label style={{color:"black" , fontWeight:"bolder"}}>Message<span style={{color: "red", fontSize:"20px"}}>*</span> :</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter message"
                  value={messag} onChange={(e) => setMessage(e.target.value)} required/>
              </Form.Group>
              <MDBRow style={{ height: "20px" }} />
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default ContactForm;
