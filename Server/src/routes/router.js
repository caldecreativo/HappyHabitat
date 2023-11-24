const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');


// //User
const userRegisterRoute = require('./users/regUser');
const userLoginRoute = require('./users/loginAuth')
const userIsAuth = require('./users/authenticated') //to authenticate, that user is logged in, when trying to go to page
const updateUser = require('./users/updateUser')
const deleteUser = require('./users/deleteUser')


// // Family 
const createFamiliesRoute = require("./families/regFam");
const addUserToFamilyRoute = require("./families/addToFam");
const removeUserFromFamilyRoute = require("./families/removeFromFam")
const updateFamilyRoute = require("./families/updateFam");
const deleteFamilyRoute = require("./families/deleteFam");
const readAllUsers = require('./users/readAllUsers');

router.get('/users', readAllUsers)

// //User routes

// register user
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

// Login user
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

// Update user
router.put('/updateUser',
body('newUserName').optional().isLength({ min: 5 }).withMessage('Brugernavn skal være minimum 5 karaktere')
.custom((value) => {
  if (!value) {
    throw new Error('Der mangler at blive udfyldt felter');
  }
  if (value.includes("'") || value.includes("-")) {
    throw new Error('Brugernavn må ikke indeholde apostrof eller bindestreg');
  }
  return true;
}),
body('newEmail').optional().isEmail().withMessage('Ny email er ikke gyldig'),
  body('newPassword').optional()
  .isLength({ min: 6 }).withMessage('Nyt password skal være minimum 6 karakterer')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Nyt password skal indeholde mindst ét lille bogstav, ét stort bogstav og et tal'),
updateUser)

// Delete user
router.delete('/deleteUser', deleteUser)

// //Family Routes

// Register Family
router.post("/families/register", 
body('familyName')
    .isLength({ min: 1 }).withMessage('Familienavn skal være minimum 5 karaktere')
    .custom((value) => {
      if (value.includes("'") || value.includes("-")) {
        throw new Error('Familienavn må ikke indeholde apostrof eller bindestreg');
      }
      return true;
    }),
createFamiliesRoute);

// Add To Family
router.post("/families/addToFamily",
// Validate familyID in body
body('familyName')
.trim()
.isLength({ min: 2 }).withMessage('FamilieName skal være minimum 2 karakterer'),
// .matches(/family\d+/).withMessage('FamilieID skal følge formatet family[nummer]'),

// Validate userID in body
body('userID')
.trim(),
// .isLength({ min: 5 }).withMessage('BrugerID skal være minimum 5 karakterer')
// .matches(/user\d+/).withMessage('BrugerID skal følge formatet user[nummer]'),
addUserToFamilyRoute);

// Remove user from family
router.post("/families/removeUserFromFamily/:familyID",
// Validate familyID in URL
param('familyID')
.trim()
.isLength({ min: 5 }).withMessage('FamilieID skal være minimum 5 karakterer')
.matches(/family\d+/).withMessage('FamilieID skal følge formatet family[nummer]'),

// Validate userID in body
body('userID')
.trim()
.isLength({ min: 5 }).withMessage('BrugerID skal være minimum 5 karakterer')
.matches(/user\d+/).withMessage('BrugerID skal følge formatet user[nummer]'),
 removeUserFromFamilyRoute);

// Update family
router.put("/families/updateFamily/:familyID", 
 // Validate familyID in URL
 param('familyID')
 .trim()
 .matches(/family\d+/).withMessage('FamilieID skal følge formatet family[nummer]'),

// Validate new family name in body
body('newFamilyName')
 .trim()
 .isLength({ min: 2 }).withMessage('Nyt familiennavn skal være minimum 2 karakterer')
 .not().isEmpty().withMessage('Nyt familiennavn kan ikke være tomt')
 .custom((value) => {
  if (value.includes("'") || value.includes("-")) {
    throw new Error('Det Nye familienavn må ikke indeholde apostrof eller bindestreg');
  }
  return true;
}),
updateFamilyRoute);

// Delete family
router.delete("/families/deleteFamily/:familyID",deleteFamilyRoute);


module.exports = router;