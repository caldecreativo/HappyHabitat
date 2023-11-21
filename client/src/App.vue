<template>
  <div id="app">
  <div class="logoBox">
        <img class="hhLogo" :src="require('./assets/hhLogo.png')" alt="logo">
      </div>
      <router-view/>
    </div>
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
    background-image: url('./assets/backLp.png');
  }


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


</style>
