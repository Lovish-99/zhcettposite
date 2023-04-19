import React, { useEffect } from 'react';
import Navbar from '../../../components/Main/navbar/Navbar';
import CompanyRegister from '../../../components/Recruiters/Register/CompanyRegister';
import Footer from '../../../components/Main/footer/footer';
import { useNavigate } from 'react-router-dom';

const CompanyRegisterScr = () => {
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
      <CompanyRegister />
      <Footer/>
    </>
  )
}

export default CompanyRegisterScr;
