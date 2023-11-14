const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//  router.get('/', (req, res) => {
//    res.send('Hello World!');
//  });

// //User
const userRegisterRoute = require('./users/regUser');
// const userLoginRoute = require('./routes/user/authUser')
// const userIsAuth = require('./routes/user/isAuth') //to authenticate, that user is logged in, when trying to go to page
// const updateUser = require('./routes/user/updateUser')
// const deleteUser = require('./routes/user/deleteUser')



// //Teams Routes
// const createTeamsRoute = require("./routes/teams/createTeamsRoute");
// const readAllTeamsTodosRoute = require("./routes/teams/readTeamTodosRoute");
// const updateTeamsRoute = require("./routes/teams/updateTeamRoute");
// const deleteTeamsRoute = require("./routes/teams/deleteTeamRoute");
// const addUserToTeamRoute = require("./routes/teams/addToTeamRoute");
// const removeUserFromTeamRoute = require("./routes/teams/removeUserFromTeamRoute")
// const userAndTeamsRoute = require("./routes/teams/userAndTeamsRoute")


// //User routes
router.post('/register', 
body('userName')
    .isLength({ min: 5 }).withMessage('Brugernavn skal være minimum 6 karaktere')
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
// router.post('/login', userLoginRoute)
// router.put('/updateUser/:id', updateUser)


// //Team Routes
// router.post("/teams/create", createTeamsRoute);
// router.get("/teams/:teamId", readAllTeamsTodosRoute);
// router.put("/teams/:id", updateTeamsRoute);
// router.delete("/teams/:teamId", deleteTeamsRoute);
// router.post("/teams/addToTeam/:teamID", addUserToTeamRoute);
// router.post("/teams/removeUserFromTeam/:teamID", removeUserFromTeamRoute);

// router.get("/teams/addMember/:teamId", userAndTeamsRoute);

module.exports = router;