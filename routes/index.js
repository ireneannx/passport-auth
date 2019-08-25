const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
//welcome page
router.get('/',(req,res)=>{
    res.render("welcome");
    //renders from welcome.ejs from views
});

//dashboard
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render("dashboard",{
        //user: req.user //commented out because we dont wanna pass the entire user object but just the name
        name: req.user.name
    });
    //2nd parameter passed to .render so that we can display user.name since the user object is now available to us
});

module.exports = router;