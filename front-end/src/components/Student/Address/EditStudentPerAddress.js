import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import ReactLoading from "react-loading";
import { API_URL } from '../../../helper';

const EditStudentPerAddress = () => {
  const [flatNo, setflatNo] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [locality, setlocality] = useState("");
  const [city, setcity] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const authorize = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    getPerAddressDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPerAddressDetails = async () => {
    if (authorize) {
      setLoading(true);
      const idd = JSON.parse(localStorage.getItem("student"))._id;
      let result = await fetch(
        `${API_URL}/dataapi/add-data/${idd}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      result = result.data.data;
      setflatNo(result.stdperadd.flatNo);
      setarea(result.stdperadd.area);
      setlandmark(result.stdperadd.landmark);
      setlocality(result.stdperadd.locality);
      setcity(result.stdperadd.city);
      setpostalCode(result.stdperadd.postalCode);
      setcountry(result.stdperadd.country);
      setprovince(result.stdperadd.province);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  const update_peraddress = async () => {
    const idd = JSON.parse(localStorage.getItem("student"))._id;
    setLoading2(true);
    await fetch(`${API_URL}/dataapi/update-data/${idd}`, {
      method: "put",
      body: JSON.stringify({
        stdperadd: {
          flatNo,
          area,
          landmark,
          locality,
          city,
          postalCode,
          country,
          province,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    setLoading2(false);
    alert("updated successfully");
  };

  const CountryVar = Country.getAllCountries();
  const StateVar = State.getStatesOfCountry(country);
  const CityVar = City.getCitiesOfState(country, province);

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
          <MDBContainer>
            <MDBCard className="text-black m-5" style={{ borderRadius: "0px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    EDIT PERMANENT ADDRESS
                  </MDBCol>
                </MDBRow>

                <MDBRow style={{ height: "20px" }}></MDBRow>
                <MDBRow>
                  <form>
                    <MDBRow>
                      <MDBCol>
                        <label className="required" htmlFor="details">
                          Flat, House no., Building, Company, Apartment{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
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
                        <label htmlFor="street">
                          Area, Street, Sector, Village{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
                        </label>
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
                          Locality{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
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
                          Country{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
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
                        <label htmlFor="province_id">
                          Province{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
                        </label>
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
                        <label htmlFor="city_id">
                          City{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
                        </label>
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
                          Postal Code{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                          :
                        </label>
                        <input
                          id="postal_code"
                          className="form-control"
                          type="text"
                          name="postal_code"
                          value={postalCode}
                          onChange={(e) => setpostalCode(e.target.value)}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ height: "20px" }}></MDBRow>
                    <MDBRow>
                      <MDBRow>
                        <MDBCol>
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
                                <ReactLoading type="spin" color="#0000FF" height={60} width={30} />
                              </MDBContainer>
                            ) : (
                              <MDBBtn
                                type="submit"
                                onClick={() => {
                                  update_peraddress();
                                }}
                              >
                                Update
                              </MDBBtn>
                            )};
                          </>
                        </MDBCol>
                        <MDBCol>
                          <Link to="/student/stdaddress">
                            <MDBBtn>Back</MDBBtn>
                          </Link>
                        </MDBCol>
                      </MDBRow>
                    </MDBRow>
                  </form>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </>
      )}
    </>
  );
};

export default EditStudentPerAddress;
