import React, {useEffect} from 'react';
import Login from '../../components/Main/MainLogin';
import Nabvar from '../../components/Main/navbar/Navbar';
import Footer from '../../components/Main/footer/footer';
import { useNavigate } from 'react-router-dom';

const MainLoginScr = () => {
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
      <Login />
      <Footer/>
    </>
  );
};

export default MainLoginScr;