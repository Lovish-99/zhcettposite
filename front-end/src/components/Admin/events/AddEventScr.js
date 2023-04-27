import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helper";
import base64 from "base64-js";

const AddEvent = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [supportiveDocs, setsupportiveDocs] = useState("");
  const [description, setdescription] = useState("");
  const [phone, setphone] = useState("");
  useEffect(() => {
    const authorize = localStorage.getItem("token");
    if (!authorize) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const covertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64String = base64.fromByteArray(uint8Array);
      setsupportiveDocs(base64String);
    };
    reader.readAsArrayBuffer(e.target.files[0]);

  };

  const uploadJob = async () => {
    await fetch(`${API_URL}/eventapi/upload-event`, {
      method: "post",
      body: JSON.stringify({
        title,
        location,
        date,
        name,
        phone,
        email,
        supportiveDocs,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    alert("event added successfully");
    navigate("/admin/viewEvent");
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ADD Event OPPORTUNITY
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow style={{ height: "20px" }}></MDBRow>
          <form>
            <MDBRow>
              <MDBCol>
                <label>Event Title: </label>
                <MDBInput
                  id="title"
                  required
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Event Date: </label>
                <MDBInput
                  id="lastApplyBy"
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Venue: </label>
                <MDBInput
                  id="location"
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Organizer Name: </label>
                <MDBInput
                  id="description"
                  required
                  type="text"
                  value={name}
                  rows={4}
                  onChange={(e) => setname(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Organizer Email : </label>
                <MDBInput
                  id="email"
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <label>Organizer Contact No: </label>
                <MDBInput
                  id="location"
                  required
                  type="tel"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setphone(e.target.value)}
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <label>Event Description: </label>
                <MDBTextArea
                  id="description"
                  required
                  type="text"
                  rows={4}
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></MDBTextArea>
              </MDBCol>
              <MDBCol>
                <label>Upload SupportiveDocs: </label>
                <input
                  id="supportivedoc"
                  accept=".pdf, .jpg, .jpeg, .doc"
                  type="file"
                  onChange={covertToBase64}
                ></input>
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ height: "20px" }}></MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="button" onClick={() => uploadJob()}>
                  Save
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <Link to="/admin/viewEvent">
                  <MDBBtn>Back</MDBBtn>
                </Link>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AddEvent;
