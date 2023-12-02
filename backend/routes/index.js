//Assignment 1
const express =  require("express");
const UserModel = require('../models/users');
const EmpModel = require('../models/employees');

const routes = express.Router();

//#1
///api/v1/user/signup  POST  Allow user to create new account  201
routes.post("/user/signup", async(req, res) => {
    try{
        const newUser = new UserModel({
            ...req.body
        });
        await newUser.save();
        res.status(201).send(newUser);
    }catch(error){
        res.status(500).send(error);
    }
})

//#2
// http://localhost:8089/api/v1/user/login
///api/v1/user/login  POST  Allow user to access the system   200
routes.post("/user/login", async(req, res) => {
    try{
        const {username, password} = req.body;
        const userInfo = await UserModel.findOne({username: username});
        console.log(userInfo);
        if (userInfo.username != req.body.username || userInfo.password != req.body.password){
            res.status(400).send({
                status: false,
                message: "Invalid Username and password"
            })
        }else{
            res.status(200).send({
                status: true,
                username: `${userInfo.username}`,
                message: "User logged in successfully",
            });
        }
    }catch(error){
        res.status(500).send(error);
    }
})

//#3
///api/v1/emp/employees  GET   User can get all employee list   200
routes.get("/emp/employees", async(req, res) => {
    try{
        const empList = await EmpModel.find({});
        res.status(200).send(empList);
    }catch(error){
        res.status(500).send(error);
    }
})

//#4
///api/v1/emp/employees  POST   User can create new employee   201
routes.post("/emp/employees", async(req, res) => {
    try{
        console.log(req.body)
        const newEmployee = new EmpModel({
            ...req.body
        });
        await newEmployee.save();
        res.status(201).send(newEmployee);
    }catch(error){
        res.status(500).send(error);
    }
})


//#5
///api/v1/emp/employees/{eid}    GET   User can get employee details by employee id   200
routes.get("/emp/employees/:eid", async(req, res) => {
    try{
        const employee = await EmpModel.findOne({_id: req.params.eid});
        res.status(200).send(employee);
    }catch(error){
        res.status(500).send(error);
    }
})


//#6
///api/v1/emp/employees/{eid}   PUT   User can update employee details   200
routes.put("/emp/employees/:eid", async(req, res) => {
    try{
        const {first_name, last_name, email, gender, salary} = req.body;
        const doc = await EmpModel.findOneAndUpdate({_id: req.params.eid}, req.body, {new: true});
        res.status(200).send(doc);
    }catch(error){
        res.status(500).send(error);
    }
})

//#7
///api/v1/emp/employees?eid=xxx   DELETE   User can delete employee by employee id   204
routes.delete("/emp/employees", async(req, res) => {
    try{
        const employee = await EmpModel.findOneAndDelete(req.query.eid);  //alternative syntax
        if(!employee){
            res.status(404).send({message: 'Employee not found'});
        }else{
            res.status(204).send({message: 'Deleted Successfully'});
        }
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = routes;
