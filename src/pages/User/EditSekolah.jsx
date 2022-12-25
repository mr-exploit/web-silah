import React, {useEffect} from 'react';
import Layout from '../Layout';
import FormEditSekolah from '../../components/user/EditSekolah';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditSekolah = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() =>{
      dispatch(getMe());
    }, [dispatch]);

    useEffect(() =>{
      if(isError){
        navigate("/");
      }
      if(user && user.role !=="user"){
        navigate("/dashboard");
      }
    }, [isError, user, navigate]);

  return (
    <div>
        <Layout>
            <FormEditSekolah />
        </Layout>
    </div>
  )
}

export default EditSekolah;