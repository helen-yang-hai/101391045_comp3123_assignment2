import React, { Component } from 'react'
import AxiosApi from '../api/AxiosApi'
import withNavigateHook from './withNavigateHook';
import "./Components.css";


export class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.handleToList = this.handleToList.bind(this);
    }

    useEffect = () => {
        this.handleToList();
    }

    handleToList() {
        this.props.navigation('/list');
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addNewEmployee = () => {
        try{
            const newEmployee = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email
            }
            AxiosApi.post('/api/v1/emp/employees', 
                newEmployee
            ).then(res => console.log(res))
            this.handleToList()
        }catch(error){
            console.log(error);
        }
    }

  render() {
    return (
      <div className='container'>
        <h3>Add Employee</h3>
        <form>
            <div class="mb-3">
                <label class="form-label">First Name:
                <input class="form-control" name="first_name" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='First Name'></input>
                </label>
            </div>
            <div class="mb-3">
                <label class="form-label">Last Name:
                <input class="form-control" name="last_name" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='Last Name'></input>
                </label>
            </div>
            <div class="mb-3">
                <label class="form-label">Email:
                <input class="form-control" name="email" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='Email Address'></input>
                </label>
            </div>
            <div>
                <button class="btn btn-primary" onClick={this.addNewEmployee}>Save</button>
                <button class="btn btn-primary" onClick={this.handleToList}>Cancel</button>
            </div>
        </form>


      </div>
    )
  }
}

export default withNavigateHook(Create);