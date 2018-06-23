const passport = require('passport');
const Recipes = require('../models/recipes');

module.exports = (app) => {

  app.get('/login',(req,res)=>{
    res.render('login');
  });

  app.get('/logout', (req, res) => {
      req.session.destroy();
      req.session = null;
      req.logout();
      res.redirect('/');
  });

  app.get('/about',(req,res)=>{
    res.render('about');
  });



}
