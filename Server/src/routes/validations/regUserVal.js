const { body } = require("express-validator");
const PenguinUserModel = require("../../models/UserModel");

// Dk's most used passwords
const commonPasswords = [
  "123456",
  "123456789",
  "12345",
  "1234",
  "12345678",
  "123123",
  "password",
  "1234567",
  "111111",
  "qwerty",
];

// Validation for Registration of user
const userValidationRules = [
  // Username
  body("userName")
    // Removes space front and back of input
    .trim()
    // Sets the min. length
    .isLength({ min: 5 })
    .withMessage("Brugernavn skal være minimum 5 karaktere")
    // Custom validation for blacklisting of special char
    .custom((value) => {
      if (value.includes("'") || value.includes("-")) {
        return Promise.reject(
          "Brugernavn må ikke indeholde apostrof eller bindestreg"
        );
      }
      return true;
    }),

  body("email")
    .trim()
    // Checks if it is an email
    .isEmail()
    .withMessage("Dette er ikke en email")
    .custom(async (value) => {
      const user = await PenguinUserModel.findOne({ email: value });
      if (user) {
        return Promise.reject("E-mail eksisterer allerede");
      }
    }),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password skal være minimum 8 karaktere")
    // maching if password has one Big, one small letter, and special characters
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password skal indeholde mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn"
    )
    // custom chek for common passwords
    .custom((value) => {
      if (commonPasswords.includes(value)) {
        return Promise.reject("Password er for almindelig og let at gætte");
      }
      return true;
    })
    .custom((value) => {
      if (value.includes("'") || value.includes("-")) {
        return Promise.reject(
          "Password må ikke indeholde apostrof eller bindestreg"
        );
      }
      return true;
    }),
];

module.exports = userValidationRules;
