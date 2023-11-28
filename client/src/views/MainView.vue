<template>
    <section class="logView">
      <div class="btnBox">
        <router-link to="/login"><button class="frontBtn">Login</button></router-link>
        <router-link to="/register"><button class="frontBtn">Registrer</button></router-link>
      </div>
      <div class="pLogin">
        <p>Glemt login?</p>
        <p>Login med Google</p>
      </div>
    </section>
  </template>
    
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');
  
  
  
  .btnBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 40px;
  }
  
  .frontBtn {
    font-family: 'Amatic SC', sans-serif;
    width: 260px;
    height: 65px;
    background-color: #416DA1;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 55px;
    
  }
  
  .pLogin {
    font-family: 'Amatic SC', sans-serif;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: white;
    margin-top: 70px;
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
  