import React from 'react';
import AxiosApi from '../api/AxiosApi'
import withNavigateHook from './withNavigateHook';
import "./Components.css";


export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: []
    }
    this.handleToCreate = this.handleToCreate.bind(this);
    this.handleToView = this.handleToView.bind(this);
    this.handleToUpdate = this.handleToUpdate.bind(this);
  }

  componentDidMount = () => {
    this.getAllEmployees();
  }

  handleToCreate() {
    this.props.navigation('/create');
  }

  handleToView = (_id) => {
    console.log("view clicked with eid: ", _id)
    this.props.navigation(`/view/${_id}`);
  }

  handleToUpdate = (_id) => {
    console.log("update clicked with eid: ", _id)
    this.props.navigation(`/update/${_id}`);
  }


  getAllEmployees = async() =>{
    try{
      var res = await AxiosApi.get('/api/v1/emp/employees')
      this.setState({
        ...this.state,
        employees: res.data})
    }catch(error){
      console.log(error)
    }
  }

  deleteEmployeeById = async(_id) => {
    try{
      var res = await AxiosApi.delete(`/api/v1/emp/employees?eid=${_id}`)
      {window.location.reload(true)}
    }catch(error){
      console.log(error)}
  }

  render() {
    return(
      <div className='listContainer'>
        <h3>Employee List</h3>
        <button class="btn btn-primary" onClick={this.handleToCreate}>Add Employee</button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {this.state.employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
              <button class="btn btn-primary" onClick = {()=>this.handleToUpdate(employee._id)}>Update</button>
              <button class="btn btn-primary" onClick = {()=>this.handleToView(employee._id)}>View</button>
              <button class="btn btn-danger" onClick = {() =>this.deleteEmployeeById(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
            </tbody>
        </table>
      </div>
    )
  }

}

export default withNavigateHook(List);