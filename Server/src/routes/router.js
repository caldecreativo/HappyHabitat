const express = require('express');
const router = express.Router();

 router.get('/', (req, res) => {
   res.send('Hello World!');
 });

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
router.post('/register', userRegisterRoute)
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