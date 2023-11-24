<template>
    <section>
      <router-link to="opdater-bruger"><button>Opdater bruger</button></router-link>
      <button @click="confirmDelete">Slet bruger</button>
      <button @click="logout">Log ud</button>
    </section>
  </template>
  
  <script>
  import router from '../router/index';
  import axios from 'axios';
  
  export default {
    data() {
      return {};
    },
  
    methods: {
      async logout() {
        // Log ud og fjern lokale oplysninger
        this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('familyName');
        await router.push('/');
      },

  
      async confirmDelete() {
  // Vis en bekræftelsesdialog for at slette brugeren
  const isConfirmed = window.confirm('Er du sikker på, at du vil slette din konto?');

  if (isConfirmed) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('User ID from localStorage:', user.userID);
      
      // Send en DELETE-anmodning til serveren for at slette brugeren med det rigtige bruger-ID
      const response = await axios.delete(`http://localhost:8081/deleteUser/${user.userID}`);

      if (response.status === 200) {
        // Slet lokale oplysninger og log ud
        this.logout();
      } else {
        // Håndter fejl ved sletning
        console.error('Fejl ved sletning af bruger');
      }
    } catch (error) {
      // Håndter fejl ved sletning
      console.error('Fejl ved sletning af bruger:', error);
    }
  }
}
    },
  };
  </script>

<style></style>