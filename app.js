const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

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

//Express session middleware 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash 
app.use(flash());

// Global Vars - because we want different colours for different alert on flash
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use("/users", require('./routes/users'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
