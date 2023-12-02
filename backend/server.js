const express = require("express");
const cors = require('cors');
const indexRoutes = require("./routes/index");
const mongoose = require('mongoose');

const app = express();

const SERVER_PORT = 8089;

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//const DB_CONNECTION_STRING = "mongodb+srv://rootadmin:qwer1234@cluster0.mn0pq2e.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"
const DB_CONNECTION_STRING = "mongodb://mongo:27017/f2023ems"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api/v1", indexRoutes);

app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 1</h1>")
    });

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
});

