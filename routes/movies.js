
const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies.js');

// Show Movies
router.get('/' , (req, res, next) => {
  Movies.find()
  .then(result => res.render('movies/movies.ejs', {movies: result}))
  .reject (err => console.log(err));
});

// New Movie
router.get('/new' , (req, res, next) => {
  res.render('movies/new.ejs')
});

router.post('/new',(req,res,next) =>{
  const newMovie = new Movies ({
      title : req.body.title,
      genre : req.body.genre,
      plot  : req.body.plot
  })
  newMovie.save()
    .then(result => res.render('index.ejs'))
    .catch(err => console.log("Error in creating movie"))
});

//Edit Movies
router.get('/:id', (req,res, next) => {
  Movies.findById(req.params.id)
    .then(result => res.render('movies/update.ejs', {movie:result}))
    .reject (err => console.log(err));
})

router.post('/update/:id', (req, res, next) => {
  const update = {
    title : req.body.title,
    genre : req.body.genre,
    plot  : req.body.plot
  }
  Movies.findByIdAndUpdate(req.params.id , update)
    .then(result => res.render('index.ejs'))
    .catch(err => console.log ("Error in editing movie"))
});

// Delete Movies
router.get('/delete/:id', (req, res, next) => {
  Movies.findByIdAndRemove(req.params.id)
    .then( result =>  res.redirect('/movies'))
    .reject( err => console.log(err));
});


module.exports = router;