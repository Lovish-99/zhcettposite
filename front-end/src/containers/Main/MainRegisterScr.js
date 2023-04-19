import React, { useEffect } from 'react'
import Register from '../../components/Main/MainRegister';
import Nabvar from '../../components/Main/navbar/Navbar';
import Footer from '../../components/Main/footer/footer';
import { useNavigate } from 'react-router-dom';

const MainRegisterScr = () => {
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
      <Nabvar />
      <Register />
      <Footer/>
    </>
  );
};

export default MainRegisterScr;