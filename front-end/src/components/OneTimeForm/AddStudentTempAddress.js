import React, { useState, useEffect } from "react";
import {
  MDBBtn, MDBRow, MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

function AddStudentTempAddress() {
  const navigate = useNavigate();
  const [nextButton, setnextbutton] = useState(true);
  const [flatNo, setflatNo] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [locality, setlocality] = useState("");
  const [city, setcity] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("stdtempaddress");
    if (auth) {
      getTempAddressDetails();
      const details = JSON.parse(auth);
      delete details.landmark;
      const isEmpty = Object.values(details).some(
        (x) => x === null || x === ""
      );
      if (isEmpty) {
        setnextbutton(true);
      } else {
        setnextbutton(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTempAddressDetails = async () => {
    let result = JSON.parse(localStorage.getItem("stdtempaddress"));
    console.log(result);
    if (result) {
      setflatNo(result.flatNo);
      setarea(result.area);
      setlandmark(result.landmark);
      setlocality(result.locality);
      setcity(result.city);
      setpostalCode(result.postalCode);
      setcountry(result.country);
      setprovince(result.province);
    }
  };

  const set_student_address = async () => {
    const profi = JSON.stringify({
      flatNo,
      area,
      landmark,
      locality,
      city,
      postalCode,
      country,
      province,
    });
    localStorage.setItem("stdtempaddress", profi);
  };

  const NextButton = () => {
    navigate("/onetimeform/addstdeducat");
  };
  const CountryVar = Country.getAllCountries();
  const StateVar = State.getStatesOfCountry(country);
  const CityVar = City.getCitiesOfState(country, province);

  return (
    <>
      <MDBRow style={{ padding: "0px 30px", paddingTop: "10px" }}>
        <hr />
      </MDBRow>
      <MDBRow style={{ height: "25px" }}></MDBRow>
      <MDBRow>
        <MDBCol
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          ADD Corresponding ADDRESS
        </MDBCol>
      </MDBRow>
      <MDBRow style={{ height: "20px" }}></MDBRow>
      <MDBRow>
        <form>
          <MDBRow>
            <MDBCol>
              <label className="required" htmlFor="details">
                Flat, House no., Building, Company, Apartment <span style={{color: "red", fontSize:"20px"}}>*</span>:
              </label>
              <input
                className="form-control"
                type="text"
                name="details"
                id="details"
                required
                value={flatNo}
                onChange={(e) => setflatNo(e.target.value)}
              />
            </MDBCol>
            <MDBCol>
              <label htmlFor="street">Area, Street, Sector, Village <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
              <input
                className="form-control"
                type="text"
                name="street"
                id="street"
                value={area}
                required
                onChange={(e) => setarea(e.target.value)}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <label htmlFor="landmark">Landmark</label>
              <input
                className="form-control"
                type="text"
                name="landmark"
                id="landmark"
                value={landmark}
                onChange={(e) => setlandmark(e.target.value)}
              />
            </MDBCol>
            <MDBCol>
              <label className="required" htmlFor="locality">
                Locality <span style={{color: "red", fontSize:"20px"}}>*</span>:
              </label>
              <input
                className="form-control"
                type="text"
                name="locality"
                id="locality"
                value={locality}
                onChange={(e) => setlocality(e.target.value)}
                required
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <label className="required" htmlFor="country_id">
                Country <span style={{color: "red", fontSize:"20px"}}>*</span>:
              </label>
              <select
                className="form-control select2"
                name="country_id"
                id="country_id"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                required
                aria-hidden="true"
              >
                <option>--Select Country--</option>

                {CountryVar.map((item, index) => {
                  return (
                    <option key={index} value={item.isoCode}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
            <MDBCol>
              <label htmlFor="province_id">Province <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
              <select
                className="form-control"
                name="province_id"
                id="province_id"
                value={province}
                onChange={(e) => setprovince(e.target.value)}
                required
              >
                <option>--Select State--</option>

                {StateVar.map((item, index) => {
                  return (
                    <option key={index} value={item.isoCode}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <label htmlFor="city_id">City <span style={{color: "red", fontSize:"20px"}}>*</span>:</label>
              <select
                className="form-control"
                name="city_id"
                id="city_id"
                required
                value={city}
                onChange={(e) => setcity(e.target.value)}
              >
                <option>--Select City--</option>

                {CityVar.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
            <MDBCol>
              <label className="required" htmlFor="postal_code">
                Postal Code <span style={{color: "red", fontSize:"20px"}}>*</span>:
              </label>
              <input
                id="postal_code"
                className="form-control"
                type="text"
                name="postal_code"
                value={postalCode}
                maxLength="6"
                onChange={(e) => setpostalCode(e.target.value)}
                required
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ height: "20px" }}></MDBRow>
          <MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBBtn
                  type="submit"
                  onClick={() => {
                    set_student_address();
                  }}
                >
                  Save
                </MDBBtn>
              </MDBCol>

              <MDBCol>
                <MDBBtn
                  type="button"
                  disabled={nextButton}
                  onClick={() => {
                    NextButton();
                  }}
                >
                  Next
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBRow>
        </form>
      </MDBRow>
    </>
  );
}

export default AddStudentTempAddress;
