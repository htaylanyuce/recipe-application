const passport = require('passport');
const Recipes = require('../models/recipes');

module.exports =  (app) => {

  app.use((req, res, next) => {
     res.locals.currentUser = req.user;
     next();
  });

  app.get('/createNew',ensureAuthenticated,(req,res)=>{
    res.render('newRecipe');
  });

  app.post('/createNew',ensureAuthenticated,(req,res)=>{
      let name = req.body.name;
      let image = req.body.image;
      let description = req.body.description;

      let author = {
          id: req.user._id,
          authorName: req.user.authorName
      }
      let newRecipe = {name:name,image:image,description:description,author:author};
      console.log(req.user);

      Recipes.create(newRecipe, (err, newlyCreated) =>{
          if(err){
              console.log(err);
          } else {
              res.redirect('/');
          }
      });
  });
  app.get('/show',(req,res)=>{
    Recipes.find({},(err,recipes)=>{
      if(!err)
        res.render('show',{recipes:recipes});
    });
  });
  app.get('/show/:id',(req,res)=>{
    Recipes.findById(id,(err,recipe)=>{
      if(!err)
        res.render('recipe',{recipe:recipe});
    });
  });
  app.get('/lucky',(req,res)=>{

    Recipes.findRandom().limit(1).exec((err,recipe)=>{
      console.log(recipe.authorName);
      if(!err){
        res.render('recipe',{recipe:recipe});
      }

    });
  });

  app.get('/ownPage',ensureAuthenticated,(req,res)=>{

    const id = req.user._id;
    console.log(id)
    Recipes.find({"author.id":id},(err,recipes)=>{
      if(!err)
          res.render('ownPage',{recipes:recipes});
      else {
          console.log(err);
      }
    });
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
