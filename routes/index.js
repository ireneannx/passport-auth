const express = require('express');
const router = express.Router();

//welcome page
router.get('/',(req,res)=>{
    res.render("welcome");
    //renders from welcome.ejs from views
});

//dashboard
router.get('/dashboard',(req,res)=>{
    res.render("dashboard");
    //renders from welcome.ejs from views
});

module.exports = router;