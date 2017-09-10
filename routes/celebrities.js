
const express = require('express');
const router = express.Router();
const Celebrities = require('../models/Celebrities.js');

// Show Celebrities
router.get('/' , (req, res, next) => {
  Celebrities.find()
  .then(result => res.render('celebrities/celebrities.ejs', {celebrities: result}))
  .reject (err => console.log(err));
});

// New celebrity
router.get('/new' , (req, res, next) => {
  res.render('celebrities/new.ejs')
});

router.post('/new',(req,res,next) =>{
  const newCelebrity = new Celebrities ({
      name       : req.body.name,
      occupation : req.body.occupation,
      catchPhrase: req.body.catchPhrase
  })
  newCelebrity.save()
    .then(result => res.render('index.ejs'))
    .catch(err => console.log("Error in creating celebrity"))
});

//Edit celebrities
router.get('/update/:id', (req,res, next) => {
  Celebrities.findById(req.params.id)
    .then(result => res.render('celebrities/update.ejs', {celebrity:result}))
    .reject (err => console.log(err));
})

router.post('/update/:id', (req, res, next) => {
  const update = {
    name       : req.body.name,
    ocupation  : req.body.ocupation,
    catchPhrase: req.body.catchPhrase
  }
  Celebrities.findByIdAndUpdate(req.params.id , update)
    .then(result => res.render('index.ejs'))
    .catch(err => console.log ("Error in editing celebrity"))
});

// Delete celebrities
router.get('/delete/:id', (req, res, next) => {
  Celebrities.findByIdAndRemove(req.params.id)
    .then( result =>  res.redirect('/celebrities'))
    .reject( err => console.log(err));
});


module.exports = router;
