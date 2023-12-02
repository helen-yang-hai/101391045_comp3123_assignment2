import React, { useState } from 'react';
import AxiosApi from '../api/AxiosApi';
import withNavigateHook from './withNavigateHook';
import { useParams } from 'react-router-dom';
import "./Components.css";

const Update = ({ navigation }) => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const {_id} = useParams();

  const handleToList = () => {
    navigation('/list');
  };

  const onValueChanged = (event) => {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const updateEmployee = async () => {
    try {
      const updatedEmployee = {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
      };
      await AxiosApi.put(`/api/v1/emp/employees/${_id}`, updatedEmployee);
      handleToList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updateContainer">
      <h3>Update Employee</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div class="mb-3">
          <label class="form-label">
            First Name:
            <input class="form-control" name="first_name" type="text" onChange={(e) => onValueChanged(e)} placeholder="First Name"/>
          </label>
        </div>

        <div class="mb-3">
          <label class="form-label">
            Last Name:
            <input class="form-control" name="last_name" type="text" onChange={(e) => onValueChanged(e)} placeholder="Last Name"/>
          </label>
        </div>
        
        <div class="mb-3">
          <label class="form-label">
            Email:
            <input class="form-control" name="email" type="text" onChange={(e) => onValueChanged(e)} placeholder="Email Address"/>
          </label>
        </div>
        
        <div>
        <button class="btn btn-primary" type="submit" onClick={updateEmployee}> Save </button>
        <button class="btn btn-primary" type="button" onClick={handleToList}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default withNavigateHook(Update);
