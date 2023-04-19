import React, { useEffect } from 'react';
import Navbar from '../../../components/Main/navbar/Navbar';
import CompanyLogin from '../../../components/Recruiters/Login/CompanyLogin';
import Footer from '../../../components/Main/footer/footer';
import { useNavigate } from 'react-router-dom';

const CompanyLoginScr = () => {
  const authorize = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (authorize) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <CompanyLogin />
      <Footer/>
    </>
  )
}

export default CompanyLoginScr;
