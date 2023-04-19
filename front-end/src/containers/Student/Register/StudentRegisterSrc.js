import React, { useEffect } from 'react';
import Navbar from '../../../components/Main/navbar/Navbar';
import StdRegister from '../../../components/Student/Register/StudentRegister';
import Footer from '../../../components/Main/footer/footer'
import { useNavigate } from 'react-router-dom';

const StudentRegisterSrc = () => {
  const authorize = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (authorize) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <StdRegister />
      <Footer />
    </div>
  )
}

export default StudentRegisterSrc;
