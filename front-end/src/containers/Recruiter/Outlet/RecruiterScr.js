import React, { useEffect } from 'react';
import Recruiter from '../../../components/Recruiters/Outlet/Recruiter';
import { useNavigate } from 'react-router-dom';

const RecruiterScr = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("recruiter"));
    if (!auth) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Recruiter />
    </>
  )
}

export default RecruiterScr;
