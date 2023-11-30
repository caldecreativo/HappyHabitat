<template>
    <section>
      <h2>Opdater Bruger</h2>
      <div>
        <form class="py-4" @submit.prevent="updateUser">
          <input v-model="user.userName" type="text" placeholder="Dit Brugernavn" />

          <font-awesome-icon icon="circle-info" style="color: #ffffff;" @click="openInfoModal('newUserName')" />
          <input v-model="user.newUserName" type="text" placeholder=" Nyt Brugernavn" />
          
          <infoModal :isVisible="showInfoModal === 'newUserName'" @close="showInfoModal = null">
                <h1>Brugernavn kræver:</h1>
                <p>Minimum 5 karaktere</p>
                <p>Ingen apostrof, mellemrum eller bindestreg</p>
            </infoModal>
          
            <input v-model="user.email" type="email" placeholder="Din email" />
          
            <input v-model="user.newEmail" type="email" placeholder="Ny Email" />
          
            <input v-model="user.password" type="text" placeholder="Dit Password" />
          
            <font-awesome-icon icon="circle-info" style="color: #ffffff;" @click="openInfoModal('newPassword')" />
            <input v-model="user.newPassword" type="text" placeholder="Ny Password" />
          
            <infoModal :isVisible="showInfoModal === 'newPassword'" @close="showInfoModal = null">
                <h1>Password kræver:</h1>
                <p>Minimum 8 karaktere</p>
                <p>Mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn.</p>
                <p>Ingen apostrof eller bindestreg</p>

            </infoModal>

            <ErrorModal :isVisible="showErrorModal" :message="getErrorMessage" @close="showErrorModal = false"></ErrorModal>
          <div v-if="statusMsg" class="alert" :class="getStatus">{{ statusMsg }}</div>
          <button type="submit">Opdater Bruger</button>
        </form>
      </div>
    </section>
  </template>

<script>
import axios from 'axios';
import ErrorModal from '../components/errorModal.vue';
import infoModal from '../components/infoModal.vue'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
            this.$store.commit('SET_ERROR_MESSAGE', '');
        },


    async updateUser() {
        const isNewUsernameValid = await this.validateNewUsername(this.user.newUserName);
            if (!isNewUsernameValid) {
                this.showErrorModal = true;
                return;
            }
            const isNewEmailValid = await this.validateNewEmail(this.user.newEmail);
            if (!isNewEmailValid) {
                this.showErrorModal = true;
                return;
            }
            const isNewPasswordValid = await this.validateNewPassword(this.user.newPassword);
            if (!isNewPasswordValid) {
                this.showErrorModal = true;
                return;
            }

      try {
        const response = await axios.put('http://localhost:8081/updateUser', {
          userName: this.user.userName,
          email: this.user.email,
          password: this.user.password,
          newUserName: this.user.newUserName,
          newEmail: this.user.newEmail,
          newPassword: this.user.newPassword,
        });

        // Hvis opdatering lykkes
        if (response.status === 200) {
          // Gem de nye oplysninger i localStorage
          localStorage.setItem('user', JSON.stringify(response.data.User));

          // Behandle svar fra serveren efter behov
          this.statusMsg = 'Bruger opdateret';
        } else {
          this.statusMsg = 'Fejl ved opdatering';
        }
      } catch (err) {
        console.error(err);
        this.statusMsg = 'Fejl ved opdatering';
      }
    },
  },
};
</script>


<style></style>