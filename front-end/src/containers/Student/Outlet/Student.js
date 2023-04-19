import React, { useEffect } from 'react';
import Student from '../../../components/Student/Outlet/Student';
import { useNavigate } from 'react-router-dom';

const StudentScr = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("student"));
    if (!auth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Student />
    </>
  )
}

export default StudentScr;
