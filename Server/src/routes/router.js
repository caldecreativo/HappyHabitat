const express = require("express");
const router = express.Router();
const userValidationRules = require("./validations/regUserVal");
const { validationResult } = require("express-validator");
const loginValidationRules = require("./validations/loginVal");
const updateUserRules = require("./validations/updateUserVal");
const regFamValidationRules = require("./validations/regFamVal");
const addToFamValidationRules = require("./validations/addUserToFamVal");

// //User
const userRegisterRoute = require("./users/regUser");
const userLoginRoute = require("./users/loginAuth");
const userIsAuth = require("./users/authenticated"); 
const updateUser = require("./users/updateUser");
const deleteUser = require("./users/deleteUser");

const getCookie = require("./users/getDataFromCookie");

// // Family
const createFamiliesRoute = require("./families/regFam");
const addUserToFamilyRoute = require("./families/addToFam");
const removeUserFromFamilyRoute = require("./families/removeFromFam");
const updateFamilyRoute = require("./families/updateFam");
const deleteFamilyRoute = require("./families/deleteFam");
const readAllUsers = require("./users/readAllUsers");

router.get("/users", readAllUsers);

// //User routes

// register user
router.post(
  "/register",
  userValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userRegisterRoute
);

// Login user
router.post(
  "/login",
  loginValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userLoginRoute
);

// Update user
router.put(
  "/updateUser",
  userIsAuth,
  updateUserRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUser
);

// Delete user
router.delete("/deleteUser/:id", deleteUser);

// //Family Routes

// Register Family
router.post(
  "/families/register",
  userIsAuth,
  regFamValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createFamiliesRoute
);

// Add To Family
router.post(
  "/families/addToFamily",
  userIsAuth,
  addToFamValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addUserToFamilyRoute
);

// Remove user from family
router.post(
  "/families/removeUserFromFamily/:familyID",

  removeUserFromFamilyRoute
);

// Update family
router.put(
  "/families/updateFamily/:familyID",

  updateFamilyRoute
);

// Delete family
router.delete("/families/deleteFamily/:familyID", deleteFamilyRoute);

router.get("/getCookie", getCookie);

module.exports = router;
