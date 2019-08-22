//creating user models which has a schema with all the different fields for users 

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now //default value is set to be the date now
    }
});

//create a model from your Schema 
const User = mongoose.model('User',UserSchema);
console.log(User)
//parameters = model name, schema

module.exports = User; //to be accessible by other files 