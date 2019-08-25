const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//require user collection
const User = require('../models/User');

//login page 
router.get('/login', (req, res) => {
    res.render('login');
});

//register page 
router.get('/register', (req, res) => {
    res.render('register');
});

//register handle 
router.post('/register', (req, res) => {
    //console.log(req.body)
    //pull out stuff from req.body
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all the fields' });
    }

    //check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check pass length 
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    //if there is an error, rerender the registration form
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // validation passed 
        User.findOne({ email: email }) //this returns a promise
            .then(user => {
                if (user) {
                    //user already exists 
                    errors.push({ msg: 'Email is already registered' })

                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    //user doesnt exist so create a new password
                    //creating a new model/document within the User schema
                    const newUser = new User({
                        //es5
                        // name: name,
                        // email: email,
                        // password: password

                        //es6
                        name,
                        email,
                        password,
                    });

                    //the above section creates an instance. Now we save to mongoDB atlas using newUser.save()

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed password
                            newUser.password = hash;
                            //Save user
                            newUser.save() //returns a promise
                                .then(user => {
                                    //create flash message 
                                    req.flash('success_msg', 'You are now registered and can log in');

                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))

                        }))
                }
            });
    }
});

module.exports = router;