<template>
    <section class="logView">
      <logo></logo>
      <div class="frontBox">
        <router-link to="/login"><button class="loginBtn">Login</button></router-link>
        <router-link to="/register"><button class="regBtn">Registrer</button></router-link>
      </div>
      <div class="pLogin">
        <!-- <p>Glemt login?</p> -->
        <install-pwa></install-pwa>
      </div>
      <div class="socialBox">
        <button class="fbBtn">Login med facebook</button>
      <button class="goBtn">Login med Google</button>

      </div>
    </section>
  </template>

  <script>
import InstallPwa from '../components/installPWA.vue';
  import logo from '../components/logoComp.vue';
  
export default {
  components: {
    logo,
    InstallPwa,
  },
}

</script>
    
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');
  
  
  .frontBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 50px;
  }

  .socialBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-top: 40px;
    margin-bottom: 50px;
  }


  
  .loginBtn, .regBtn   {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    width: 270px;
    height: 46px;
    background-color: #37B0B0;
    border: none;
    border-radius: 15px;
    color: white;
    font-size: 20px;
  }

  .fbBtn, .goBtn {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    width: 270px;
    height: 46px;
    background-color: #ffffff;
    color: #324576;
    border: none;
    border-radius: 10px;
    font-size: 20px;
  }
  
  .pLogin {
    font-family: 'Quicksand', sans-serif;
    font-weight: regular;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 33px;
  }
  
 
  </style>
  