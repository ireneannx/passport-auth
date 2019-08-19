const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("welcome");
    //renders from welcome.ejs from views
});

module.exports = router;