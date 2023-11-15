const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');


// //User
const userRegisterRoute = require('./users/regUser');
const userLoginRoute = require('./users/loginAuth')
const userIsAuth = require('./users/authenticated') //to authenticate, that user is logged in, when trying to go to page
const updateUser = require('./users/updateUser')
const deleteUser = require('./users/deleteUser')



// //Teams Routes
const createFamiliesRoute = require("./families/regFam");
// const updateTeamsRoute = require("./routes/teams/updateTeamRoute");
// const deleteTeamsRoute = require("./routes/teams/deleteTeamRoute");
const addUserToFamilyRoute = require("./families/addToFam");
// const removeUserFromTeamRoute = require("./routes/teams/removeUserFromTeamRoute")



// //User routes

// register
router.post('/register', 
body('userName')
    .isLength({ min: 5 }).withMessage('Brugernavn skal være minimum 5 karaktere')
    .custom((value) => {
      if (!value) {
        throw new Error('Der mangler at blive udfyldt felter');
      }
      if (value.includes("'") || value.includes("-")) {
        throw new Error('Brugernavn må ikke indeholde apostrof eller bindestreg');
      }
      return true;
    }),
body('email').isEmail().withMessage('Dette er ikke en email')
.custom((value, { req }) => {
  if (!value) {
    throw new Error('Der mangler at blive udfyldt felter');
  }
  return true;
}),
body('password')
  .isLength({ min: 6 }).withMessage('Password skal være minimum 6 karaktere')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password skal indeholde minimum ét lille bogstav, ét stort bogstav, samt tal')
  .custom((value) => {
    if (!value) {
      throw new Error('Der mangler at blive udfyldt felter');
    }
    if (value.includes("'") || value.includes("-")) {
      throw new Error('Password må ikke indeholde apostrof eller bindestreg');
    }
    return true;
  }),
userRegisterRoute)

// Login
router.post('/login', 
body('email')
.isEmail().withMessage('Dette er ikke en gyldig email')
.custom((value) => {
  if (!value) {
    throw new Error('Email skal udfyldes');
  }
  return true;
}),
body('password')
.isLength({ min: 6 }).withMessage('Password skal være minimum 6 karakterer')
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password skal indeholde mindst ét lille bogstav, ét stort bogstav og et tal')
.custom((value) => {
  if (!value) {
    throw new Error('Password skal udfyldes');
  }
  return true;
}),
userLoginRoute)

// Update
router.put('/updateUser/:id',
body('newEmail').optional().isEmail().withMessage('Ny email er ikke gyldig'),
  body('newPassword').optional()
  .isLength({ min: 6 }).withMessage('Nyt password skal være minimum 6 karakterer')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Nyt password skal indeholde mindst ét lille bogstav, ét stort bogstav og et tal'),
updateUser)

router.delete('/deleteUser/:id', deleteUser)

// //Family Routes

// Register Family
router.post("/families/register", 
body('familyName')
    .isLength({ min: 5 }).withMessage('Familienavn skal være minimum 5 karaktere')
    .custom((value) => {
      if (value.includes("'") || value.includes("-")) {
        throw new Error('Familienavn må ikke indeholde apostrof eller bindestreg');
      }
      return true;
    }),
createFamiliesRoute);
// router.put("/teams/:id", updateTeamsRoute);
// router.delete("/teams/:teamId", deleteTeamsRoute);

// Add To Family
router.post("/families/addToFamily/:familyID",
// Validate familyID
param('familyID')
.trim()
.isLength({ min: 5 }).withMessage('FamilieID skal være minimum 5 karakterer')
.matches(/family\d+/).withMessage('FamilieID skal følge formatet "family[nummer]'),

// Validate userID
body('userID')
.trim()
.isLength({ min: 5 }).withMessage('BrugerID skal være minimum 5 karakterer')
.matches(/user\d+/).withMessage('BrugerID skal følge formatet "user[nummer]'),
addUserToFamilyRoute);
// router.post("/teams/removeUserFromTeam/:teamID", removeUserFromTeamRoute);



module.exports = router;