import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../../components/Admin/outlet/AdminScreen';

const AdminScreen = () => {
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
      <AdminPanel />
    </>
  )
}

export default AdminScreen
