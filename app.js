const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB config
//uses the method .MongoURI to authenticate MongoDB 
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true}) //this returns a promise
    .then(()=> console.log("Mongo DB connected...")) //db is connected
    .catch(err => console.log(err))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs'); //set the view engine to ejs

//Bodyparser - to get req.body from form
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/', require('./routes/index'));
app.use("/users", require('./routes/users'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
