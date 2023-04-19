import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  MDBRow, MDBCard, MDBCardBody, MDBContainer
} from 'mdb-react-ui-kit';
import Alert from 'react-bootstrap/Alert';
import {API_URL} from '../../../helper';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [messag, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      const message = "Name of the Student: " + name + "\n\n" + "Student Faculty Number: " + faculty + "\n\n" + "Student Message: " + messag;

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
          <MDBCardBody>
            <Form onSubmit={sendEmail}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name<span style={{ color: "red", fontSize: "20px" }}>*</span> :</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Faculty Number<span style={{ color: "red", fontSize: "20px" }}>*</span> :</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Faculty Number"
                  value={faculty} onChange={(e) => setFaculty(e.target.value)}
                  maxLength="8" title="For example: 19COB001" required />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Your Email<span style={{ color: "red", fontSize: "20px" }}>*</span> :</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                  value={to} onChange={(e) => setTo(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicSubject">
                <label>Subject of your Query <span style={{ color: "red", fontSize: "20px" }}>*</span> : </label>
                <select
                  className="form-control select2"
                  name="subject"
                  id="subject"
                  required
                  aria-hidden="true"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Please select</option>
                  <option value="Hindu">Related to NOC</option>
                  <option value="Muslim">Related to Internship</option>
                  <option value="other2">Other</option>
                </select>
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Message<span style={{ color: "red", fontSize: "20px" }}>*</span> :</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter message"
                  value={messag} onChange={(e) => setMessage(e.target.value)} required />
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
