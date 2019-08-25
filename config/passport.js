const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //to compare the passwords and unhash

//load user model
const User = require('../models/User');

module.exports = function(passport){
  passport.use( new LocalStrategy({ usernameField :'email'}, (email,password,done)=>{
    //match user
    User.findOne({email: email})
    .then(user => {
      //if there is no user
      if(!user){
        return done(null,false,{message: "that email is not registered"});
        //done is a callback. null is the error because we dont wanna send back any error. 
      }

      //match password
      bcrypt.compare(password, user.password, (err, isMatch)=>{
        if(err) throw err;

        if(isMatch){
          return done(null,user);
        }else{
          return done(null, false,{message: 'Password incorrect'})
        }
      })
    })
    .catch(err => console.log(err))
  }))

  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}