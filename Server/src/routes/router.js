const express = require('express');
const router = express.Router();
const { body, param,  } = require('express-validator');
const userValidationRules = require('./validations/regUserVal');
const { validationResult } = require('express-validator');
const loginValidationRules = require('./validations/loginVal')
const updateUserRules = require('./validations/updateUserVal')
const regFamValidationRules = require('./validations/regFamVal')
const addToFamValidationRules = require('./validations/addUserToFamVal')


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
router.post('/register', userValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userRegisterRoute);


// Login user
router.post('/login', loginValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, 
userLoginRoute)

// Update user
router.put('/updateUser', updateUserRules,  (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, updateUser)

// Delete user
router.delete('/deleteUser/:id', deleteUser)

// //Family Routes

// Register Family
router.post("/families/register", regFamValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createFamiliesRoute);

// Add To Family
router.post("/families/addToFamily",addToFamValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, addUserToFamilyRoute);

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