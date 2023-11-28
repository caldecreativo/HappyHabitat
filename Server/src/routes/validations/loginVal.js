const { body } = require('express-validator');

const loginValidationRules = [
body('email')
.trim()
.isEmail().withMessage("Dette er ikke en email"),

body('password')
.trim()
.isLength({ min:8 }).withMessage("Password skal være minimum 8 karaktere")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password skal indeholde mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn")
.custom(value => {
    if (value.includes("'") || value.includes("-")) {
      return Promise.reject('Password må ikke indeholde apostrof eller bindestreg');
    }
    return true;
  }),
]

module.exports = loginValidationRules;