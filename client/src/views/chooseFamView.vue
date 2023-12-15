<template>
  <section class="chooseFamView">
    <logo></logo>
    <!-- <h1> {{  userName }}</h1> -->
    <div class="btnBox">
      <div class="familyBox">
        <h1>Tilføj ny familie</h1>
        <router-link to="/ny-familie"><button class="frontBtn">Tilføj familie</button></router-link>
      </div>
      <div class="familyBox">
        <h1>Tilslut til familie</h1>
        <router-link to="/tilfoj-eksisterende-familie"><button class="addToBtn">Tilslut familie</button></router-link>
      </div>
    </div>
  </section>
</template>

<script>
// Import
import logo from '../components/logoComp.vue'
export default {
  // Component
  components: {
    logo,
  },
  data() {
    return {
      // Variable to store name
      userName: '',
    };
  },
  // Lifecicle hook called after comp is created
  created() {
    this.fetchUserName();
  },
  // Methods
  methods: {
    // Fetch username from localstorage
    fetchUserName() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.userName = user ? user.userName : '';
    },


  }


}
</script>

<style>
h1 {
  margin: 0;
  font-size: 30px;
  display: flex;
  justify-content: center;
  color: white;
}

.btnBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  margin-top: 40px;
}

.familyBox {
  display: flex;
  flex-direction: column;
  gap: 40px;

}

.frontBtn,
.addToBtn {
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  width: 235px;
  height: 46px;
  background-color: #37B0B0;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 20px;

}

.addToBtn {
  margin-bottom: 50px;
}
</style>