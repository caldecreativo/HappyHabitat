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
// Imports
import axios from 'axios';
import ErrorModal from '../components/errorModal.vue';
import infoModal from '../components/infoModal.vue'
import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { mapActions, mapGetters } from "vuex";

export default {
  // Components
  components: {
    infoModal,
    ErrorModal
  },
  // Data funktion returning components data
  data() {
    return {
      // user data objects for storing form inputs
      user: {
        userName: '',
        email: '',
        password: '',
        newUserName: '',
        newEmail: '',
        newPassword: '',
        confirmPass: ''
      },
      // Varibles for modal display and error handling
      showInfoModal: null,
      showErrorModal: false,
      errorMessage: '',
      statusMsg: '',
    };
  },
  // computed properties 
  computed: {
    appIcon() {
      return faCircleInfo
    },
    xmarkIcon() {
      return faXmark;
    },
    // Vuex getters for component
    ...mapGetters(['getErrorMessage']),
  },
  // Methods
  methods: {
    // Vuex actions for component
    ...mapActions(['validateNewUsername', 'validateNewEmail', 'validateNewPassword']),
    // Info modal
    openInfoModal(field) {
      this.showInfoModal = field;
    },
    // close error modal
    closeErrorModal() {
      this.showErrorModal = false;
      this.$store.commit('ERROR_MESSAGE', '');
    },
    // Navigate back in browser
    goBack() {
      this.$router.go(-1);
    },

    // Update user info
    async updateUser() {

      // Object to hold updates
      const updates = {};

      // Validate and add new values if user wants to update
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

      // Show error if theres no changes to update
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

      // send the update request
      try {
        const response = await axios.put('http://localhost:8081/updateUser', {
          withCredentials: true,
          ...updates,
          userName: this.user.userName,
          email: this.user.email,
          password: this.user.password,
        });

        // Handle response
        if (response.status === 200) {
          const errorMessage = "Brugeroplysningerne er opdateret.";
          this.$store.commit('ERROR_MESSAGE', errorMessage);
          this.showErrorModal = true;

          // Update local data 
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