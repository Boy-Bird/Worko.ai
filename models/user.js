const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid");
      }
    }
  },
  name: {
    type: String, 
    required: true, 
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
  }
}, {timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;