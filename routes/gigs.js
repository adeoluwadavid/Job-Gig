const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const  {Sequelize} = require('sequelize')
const Op = Sequelize.Op;

// Get gig List
router.get("/", (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      
      res.render("gigs", {
        gigs,
      });
    })
    .catch((err) => console.log(err))
);
// Display add gig form
router.get("/add", (req, res) => {
  res.render("add");
});
router.post("/add", (req, res) => {

  let errors = [];
  let { title, technologies, budget, description, contact_email } = req.body;

  if (!title) {
    errors.push({ text: "Please add title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add contact email" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
      if(!budget){
          budget = 'Unknown'
      }else{
          budget =  `$${budget}`
      }
    
      //Make lowercase and remove space after the comma.
      //technologies = technologies.toLowercase().replace('/, g/', ',')

    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
      .then((gig) => res.redirect("/gigs"))
      .catch((err) => console.log(err));
  }

});

router.get('/search', (req,res)=>{
    let {term} = req.query;
    term = term.toLowerCase()
    Gig.findAll({where: {technologies: {[Op.like]:'%' + term + '%'}}}).then(gigs => res.render('gigs',{gigs})).catch(err => err)
})
module.exports = router;
