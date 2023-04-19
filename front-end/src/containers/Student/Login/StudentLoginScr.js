import React, { useEffect } from 'react';
import Navbar from '../../../components/Main/navbar/Navbar';
import LoginStd from '../../../components/Student/Login/StudentLogin';
import Footer from '../../../components/Main/footer/footer';
import { useNavigate } from 'react-router-dom';

const StudentLoginScr = () => {
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
      <LoginStd />
      <Footer/>
    </>
  )
}

export default StudentLoginScr;
