import { createStore } from "vuex";

export default createStore({
  state: {
    errorMessage: "",
  },
  getters: {
    getErrorMessage: (state) => state.errorMessage,
  },
  mutations: {
    ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    // Validate Username
    validateUsername({ commit }, username) {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*['\s-])/;
      if (username.length < 5) {
        commit("ERROR_MESSAGE", "Der er fejl i brugernavnet");
        return false;
      } else if (!regex.test(username)) {
        commit("ERROR_MESSAGE", "Der er fejl i brugernavnet");
        return false;
      }
      commit("ERROR_MESSAGE", "");
      return true;
    },

    // Validate Email
    validateEmail({ commit }, email) {
        const regex = /.+@.+\..+/;
        if (!regex.test(email)) {
           commit("ERROR_MESSAGE", "Email er ugyldig");
           return false;
        }
        commit("ERROR_MESSAGE", "");
        return true;
     },

    // Valider password
    validatePassword({ commit },  password ) {
      // Destructure password fra et objekt
      // Dk's mest brugte passwords
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
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // min 8 char
      if (password.length < 8) {
        commit("ERROR_MESSAGE", "Der er fejl i Password");
        return false;
        // 1 Big, 1 small, 1 number, 1 special char - no - ' space
      } else if (!regex.test(password)) {
        commit(
          "ERROR_MESSAGE",
          "Der er fejl i Password"
        );
        return false;
        // dk's most used passwords
      } else if (commonPasswords.includes(password)) {
        commit(
          "ERROR_MESSAGE",
          "Password er for almindelig og let at gætte."
        );
        return false;
      }
      return true;
    },

      // Validate family name
      validateFamName({ commit }, familyName) {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*['\s-])/;
        if (familyName.length < 5) {
          commit("ERROR_MESSAGE", "Der er fejl i Familienavnet");
          return false;
        } else if (!regex.test(familyName)) {
          commit("ERROR_MESSAGE", "Der er fejl i Familienavnet");
          return false;
        }
        commit("ERROR_MESSAGE", "");
        return true;
      },

          // Validate new Username
    validateNewUsername({ commit }, newUserName) {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*['\s-])/;
        if (newUserName.length < 5) {
          commit("ERROR_MESSAGE", "Der er fejl i nyt brugernavnet");
          return false;
        } else if (!regex.test(newUserName)) {
          commit("ERROR_MESSAGE", "Der er fejl i nyt brugernavnet");
          return false;
        }
        commit("ERROR_MESSAGE", "");
        return true;
      },
  
      // Validate new Email
      validateNewEmail({ commit }, newEmail) {
          const regex = /.+@.+\..+/;
          if (!regex.test(newEmail)) {
             commit("ERROR_MESSAGE", "Ny email er ugyldig");
             return false;
          }
          commit("ERROR_MESSAGE", "");
          return true;
       },
  
      // Valider New password
      validateNewPassword({ commit },  newPassword ) {
        // Destructure password fra et objekt
        // Dk's mest brugte passwords
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
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // min 8 char
        if (newPassword.length < 8) {
          commit("ERROR_MESSAGE", "Der er fejl i nyt Password");
          return false;
          // 1 Big, 1 small, 1 number, 1 special char - no - ' space
        } else if (!regex.test(newPassword)) {
          commit(
            "ERROR_MESSAGE",
            "Der er fejl i nyt Password"
          );
          return false;
          // dk's most used passwords
        } else if (commonPasswords.includes(newPassword)) {
          commit(
            "ERROR_MESSAGE",
            "Nyt password er for almindelig og let at gætte."
          );
          return false;
        }
        return true;
      },
  },
});
