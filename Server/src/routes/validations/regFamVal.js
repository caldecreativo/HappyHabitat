const { body } = require('express-validator');

// Validation for registration 
const regFamValidationRules = [
body('familyName')
.trim()
.isLength({ min: 5}).withMessage('Familienavn skal være minimum 5 karaktere')
.custom((value) => {
    if (value.includes("'") || value.includes("-")) {
      throw new Error('Familienavn må ikke indeholde apostrof eller bindestreg');
    }
    return true;
  }),

];

module.exports = regFamValidationRules;