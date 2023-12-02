import React, { useState, useEffect } from 'react';
import AxiosApi from '../api/AxiosApi';
import withNavigateHook from './withNavigateHook';
import { useParams } from 'react-router-dom';
import "./Components.css";

const View = ({ navigation }) => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const { _id } = useParams();

  useEffect(() => {
    const getEmployeeById = async (_id) => {
      try {
        console.log(`/api/v1/emp/employees/${_id}`);
        const response = await AxiosApi.get(`/api/v1/emp/employees/${_id}`);
        console.log(response.data);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployeeById(_id);
  }, [_id]);

  const handleToList = () => {
    navigation('/list');
  };

  return (
    <div className='viewContainer'>
      <h3>View Employee Details</h3>
      <p>Employee First Name: {employee.first_name}</p>
      <p>Employee Last Name: {employee.last_name}</p>
      <p>Employee Email: {employee.email}</p>
      <button class="btn btn-primary" onClick={handleToList}>Back</button>
    </div>
  );
};

export default withNavigateHook(View);
