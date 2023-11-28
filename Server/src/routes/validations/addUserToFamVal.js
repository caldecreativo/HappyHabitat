const { body, param } = require("express-validator");

const addToFamValidationRules = [
  body("familyName")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Familienavn skal være minimum 5 karaktere")
    .custom((value) => {
      if (value.includes("'") || value.includes("-")) {
        throw new Error(
          "Familienavn må ikke indeholde apostrof eller bindestreg"
        );
      }
      return true;
    }),

  param("userID")
    .trim()
    .isLength({ min: 5 })
    .matches(/user\d+/),
];

module.exports = addToFamValidationRules;
