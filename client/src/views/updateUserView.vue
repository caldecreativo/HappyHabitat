<template>
    <section>
      <h2>Opdater Bruger</h2>
      <div>
        <form class="py-4" @submit.prevent="updateUser">
          <input v-model="user.userName" type="text" placeholder="Brugernavn" />
          <input v-model="user.newUserName" type="text" placeholder=" Nyt Brugernavn" />
          <input v-model="user.email" type="email" placeholder="Email" />
          <input v-model="user.newEmail" type="email" placeholder="Ny Email" />
          <input v-model="user.password" type="text" placeholder="Password" />
          <input v-model="user.newPassword" type="text" placeholder="Ny Password" />
          <div v-if="statusMsg" class="alert" :class="getStatus">{{ statusMsg }}</div>
          <button type="submit">Opdater Bruger</button>
        </form>
      </div>
    </section>
  </template>

<script>
import axios from 'axios';
export default {
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
      statusMsg: '',
    };
  },
  methods: {
    async updateUser() {
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