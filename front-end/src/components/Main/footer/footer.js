import React from "react";
import { Navbar } from "react-bootstrap";
import { MDBRow } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <>
      <Navbar sticky="bottom" style={{padding: "0px", marginTop:"10px"}}>
        <MDBRow style={{marginLeft: "12px", width: "100%"}}>
          <MDBRow className="bg-light text-center text-white" >
            <section className="mb-4 mt-4">
              {/* facebook */}
              <a className="btn text-white  m-1" style={{ backgroundColor: "#3b5998" }} href="#!" role="button" >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              {/* twitter */}
              <a className="btn text-white  m-1" style={{ backgroundColor: "#55acee" }} href="#!" role="button" >
                <i className="fa-brands fa-twitter"></i>
              </a>
              {/* google */}
              <a className="btn text-white  m-1" style={{ backgroundColor: "#dd4b39" }} href="#!" role="button" >
                <i className="fa-brands fa-google"></i>
              </a>
              {/* instagram */}
              <a className="btn text-white  m-1" style={{ backgroundColor: "#ac2bac" }} href="#!" role="button" >
                <i className="fa-brands fa-instagram"></i>
              </a>
              {/* linkedin */}
              <a className="btn text-white  m-1" style={{ backgroundColor: "#0082ca" }} href="#!" role="button" >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </section>
          </MDBRow>

          <MDBRow className="text-center p-3" style={{ backgroundColor: "#66b2b2", color: "black" }} >
            <p>© 2023 Copyright:</p>
            <a style={{ color: "black", textDecoration: "none" }} target="_blank" href="https://www.amu.ac.in/training-and-placement/general">
              TRAINING AND PLACEMENT CELL
            </a>
          </MDBRow>
        </MDBRow>
      </Navbar>
    </>
  );
};

export default Footer;
