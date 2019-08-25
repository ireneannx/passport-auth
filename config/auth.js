module.exports = {
  ensureAuthenticated: function(req,res,next){
    //isAuthenticated is a method provided by passport 
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'please log in to view this resource');
    res.redirect('/users/login');
  }
}