const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
      },
      last_name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
      }
});

module.exports = mongoose.model("employee", employeeSchema);