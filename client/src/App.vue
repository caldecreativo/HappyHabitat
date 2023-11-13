<template>
  <section class="logView">
    <div class="logoBox">
      <img class="hhLogo" src="./assets/hhLogo.png" alt="logo">
    </div>
    <div class="btnBox">
      <button>Login</button>
      <button>Registrer</button>
    </div>
    <div class="pLogin">
      <p>Glemt login?</p>
      <p>Login med Google</p>
    </div>
  </section>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
  </nav> -->
  <!-- <router-view/> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

@media screen and (min-width: 600px) {
  body {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #app {
    position: relative;
    width: 375px;
    height: 667px;
    border: 1px solid black;
    border-radius: 20px;
  }



}

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logView {
  max-width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: url('./assets/backLp.png');
}

.hhLogo {
  Width: 190px;
  Height: 170px;
  margin-top: 30px;
}

.logoBox{
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btnBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  font-family: 'Amatic SC', sans-serif;
  width: 260px;
  height: 65px;
  background-color: #416DA1;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 55px;
  margin: 30px;
  
}

.pLogin {
  font-family: 'Amatic SC', sans-serif;
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  margin-top: 35px;
  margin-left: 30px;
  margin-right: 30px;
}

p {
  margin: 0;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
