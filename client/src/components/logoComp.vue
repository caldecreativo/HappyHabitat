<template>
  <div class="logoBox">
        <img class="hhLogo" :src="require('../assets/hhLogo.png')" alt="logo">
      </div>
</template>

<script>
export default {

}
</script>

<style>

.hhLogo {
    Width: 150px;
    Height: 130px;
    margin-top: 30px;
  }
  
  .logoBox{
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>