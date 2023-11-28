const { body } = require('express-validator');
const PenguinUserModel = require('../../models/UserModel');

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
    "qwerty"
  ];

const updateUserRules = [
body('newUserName')
.optional()
.trim()
.isLength({ min: 5 })
.custom(value => {
    if (value.includes("'") || value.includes("-")) {
      return Promise.reject('Brugernavn må ikke indeholde apostrof eller bindestreg');
    }
    return true;
  }),

body('newEmail')
.optional()
.trim()
.isEmail().withMessage("Dette er ikke en email")
.custom(async (value) => {
    const user = await PenguinUserModel.findOne({ email: value });
    if (user) {
      return Promise.reject('E-mail eksisterer allerede');
    }
  }),
body('newPassword')
.optional()
.trim()
.isLength({ min:8 }).withMessage("Nyt password skal være minimum 8 karaktere")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Nyt password skal indeholde mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn")
.custom(value => {
    if (commonPasswords.includes(value)) {
      return Promise.reject('Nyt password er for almindelig og let at gætte');
    }
    return true;
  })
.custom(value => {
    if (value.includes("'") || value.includes("-")) {
      return Promise.reject('Nyt password må ikke indeholde apostrof eller bindestreg');
    }
    return true;
  }),
];

module.exports = updateUserRules;