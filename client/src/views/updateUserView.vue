<template>
  <section>
    <div class="updateHeader">
      <font-awesome-icon class="xmark" :icon="xmarkIcon" @click="goBack"></font-awesome-icon>
      <span>Opdater bruger</span>
      <span @click="updateUser">Gem</span>
    </div>
    <hr class="divider" />
    <div>
      <form class="py-4" @submit.prevent="updateUser">
        <section class="currentUser">
          <h2>Nuværende</h2>
          <label for="currentUsername">Brugernavn</label>
          <input id="currentUsername" v-model="user.userName" type="text" placeholder="Dit Brugernavn" />

          <label for="currentEmail">Email</label>
          <input id="curentEmail" v-model="user.email" type="email" placeholder="Din email" />

          <label for="currentPassword">Password</label>
          <input id="currentPassword" v-model="user.password" type="text" placeholder="Dit Password" />

        </section>

        <hr class="divider" />

        <section class="newUser">
          <h2>Nyt</h2>
          <label for="newUsername">
            Brugernavn
            <font-awesome-icon icon="circle-info" style="color: #ffffff;  margin-left: 5px;"
              @click="openInfoModal('newUserName')" />
          </label>
          <input v-model="user.newUserName" type="text" placeholder=" Nyt Brugernavn" />

          <infoModal :isVisible="showInfoModal === 'newUserName'" @close="showInfoModal = null">
            <h1>Brugernavn kræver:</h1>
            <p>Minimum 5 karaktere</p>
            <p>Ingen apostrof, mellemrum eller bindestreg</p>
          </infoModal>

          <label for="newEmail">Email</label>
          <input v-model="user.newEmail" type="email" placeholder="Ny Email" />

          <label for="newPassword">
            Password
            <font-awesome-icon icon="circle-info" style="color: #ffffff;  margin-left: 5px;"
              @click="openInfoModal('newPassword')" /></label>
          <input v-model="user.newPassword" type="text" placeholder="Ny Password" />

          <infoModal :isVisible="showInfoModal === 'newPassword'" @close="showInfoModal = null">
            <h1>Password kræver:</h1>
            <p>Minimum 8 karaktere</p>
            <p>Mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn.</p>
            <p>Ingen apostrof eller bindestreg</p>

          </infoModal>

          <label for="confirmPass">Bekræft password</label>
          <input v-model="user.confirmPass" type="text" placeholder="Bekræft Password" />

        </section>

        <ErrorModal :isVisible="showErrorModal" :message="getErrorMessage" @close="showErrorModal = false"></ErrorModal>
        <div v-if="statusMsg" class="alert" :class="getStatus">{{ statusMsg }}</div>

      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import ErrorModal from '../components/errorModal.vue';
import infoModal from '../components/infoModal.vue'
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    infoModal,
    ErrorModal
  },
  data() {
    return {
      user: {
        userName: '',
        email: '',
        password: '',
        newUserName: '',
        newEmail: '',
        newPassword: '',
        confirmPass: ''
      },
      showInfoModal: null,
      showErrorModal: false,
      errorMessage: '',
      statusMsg: '',
    };
  },
  computed: {
    appIcon() {
      return faCircleInfo
    },
    xmarkIcon() {
      return faXmark;
    },
    ...mapGetters(['getErrorMessage']),
  },
  methods: {
    ...mapActions(['validateNewUsername', 'validateNewEmail', 'validateNewPassword']),
    // Info modal
    openInfoModal(field) {
      this.showInfoModal = field;
    },
    closeErrorModal() {
      this.showErrorModal = false;
      this.$store.commit('ERROR_MESSAGE', '');
    },

    goBack() {
      this.$router.go(-1); // Bruger Vue-routerens go-metode til at gå et skridt tilbage i historikken
    },


    async updateUser() {
      // Objekt til at holde opdateringer
      const updates = {};

      // Valider og tilføj kun de nye værdier, som brugeren ønsker at opdatere
      if (this.user.newUserName) {
        const isValidUsername = await this.validateNewUsername(this.user.newUserName);
        if (!isValidUsername) {
          this.showErrorModal = true;
          return;
        }
        updates.newUserName = this.user.newUserName;
      }

      if (this.user.newEmail) {
        const isValidEmail = await this.validateNewEmail(this.user.newEmail);
        if (!isValidEmail) {
          this.showErrorModal = true;
          return;
        }
        updates.newEmail = this.user.newEmail;
      }

      if (this.user.newPassword) {
        const isValidPassword = await this.validateNewPassword(this.user.newPassword);
        if (!isValidPassword) {
          this.showErrorModal = true;
          return;
        }
        updates.newPassword = this.user.newPassword;
      }

      // Hvis der ikke er nogen ændringer, vis en fejl
      if (Object.keys(updates).length === 0) {
        const errorMessage = "Ingen ændringer at opdatere.";
        this.$store.commit('ERROR_MESSAGE', errorMessage);
        this.showErrorModal = true;
        this.statusMsg = 'Ingen ændringer at opdatere.';
        return;
      }


      // Check if passwords are the same
      if (this.user.newPassword !== this.user.confirmPass) {
        const errorMessage = "Passwords matcher ikke";
        this.$store.commit('ERROR_MESSAGE', errorMessage);
        this.showErrorModal = true;
        return;
      }


      try {
        const response = await axios.put('http://localhost:8081/updateUser', {
          withCredentials: true,
          ...updates,
          userName: this.user.userName,
          email: this.user.email,
          password: this.user.password,
        });

        // Håndter respons
        if (response.status === 200) {
          const errorMessage = "Brugeroplysningerne er opdateret.";
          this.$store.commit('ERROR_MESSAGE', errorMessage);
          this.showErrorModal = true;

          // Opdater lokale oplysninger eller gør, hvad der er nødvendigt her.
        } else {
          const errorMessage = "Fejl ved opdatering af brugeroplysningerne.";
          this.$store.commit('ERROR_MESSAGE', errorMessage);
          this.showErrorModal = true;
        }
      } catch (error) {
        const errorMessage = "Fejl ved opdatering af brugeroplysningerne.";
        this.$store.commit('ERROR_MESSAGE', errorMessage);
        this.showErrorModal = true;
        console.error('Opdateringsfejl:', error);

      }
    }

    // async updateUser() {
    //     const isNewUsernameValid = await this.validateNewUsername(this.user.newUserName);
    //         if (!isNewUsernameValid) {
    //             this.showErrorModal = true;
    //             return;
    //         }
    //         const isNewEmailValid = await this.validateNewEmail(this.user.newEmail);
    //         if (!isNewEmailValid) {
    //             this.showErrorModal = true;
    //             return;
    //         }
    //         const isNewPasswordValid = await this.validateNewPassword(this.user.newPassword);
    //         if (!isNewPasswordValid) {
    //             this.showErrorModal = true;
    //             return;
    //         }

    //   try {
    //     const response = await axios.put('http://localhost:8081/updateUser', {
    //       withCredentials: true,
    //       userName: this.user.userName,
    //       email: this.user.email,
    //       password: this.user.password,
    //       newUserName: this.user.newUserName,
    //       newEmail: this.user.newEmail,
    //       newPassword: this.user.newPassword,
    //     });

    //     // Hvis opdatering lykkes
    //     if (response.status === 200) {
    //       // Gem de nye oplysninger i localStorage

    //       // localStorage.setItem('user', JSON.stringify(response.data.User)); // lav ny cookie

    //       // Behandle svar fra serveren efter behov
    //       this.statusMsg = 'Bruger opdateret';
    //     } else {
    //       this.statusMsg = 'Fejl ved opdatering';
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     this.statusMsg = 'Fejl ved opdatering';
    //   }
    // },
  },
};
</script>


<style scoped>
.updateHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;

}

.xmark {
  font-size: 24px;
}

span {
  font-size: 20px;
  font-weight: bold;
}

h2 {
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-left: 20px;
}

.divider {
  border: none;
  height: 1px;
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
}

label {
  display: block;
  color: white;
  margin-left: 20px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
}

input {
  width: 330px;
  height: 50px;
  padding: 8px;
  margin-top: 6px;
  margin-bottom: 18px;
  margin-left: 20px;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  box-sizing: border-box;
}
</style>