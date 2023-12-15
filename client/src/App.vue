<template>
  <div v-touch:swipe.right="navigateBack" id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

@media screen and (min-width: 600px) {
  body {
    font-family: 'Quicksand', sans-serif;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    overflow-x: hidden;

  }

  #app {
    position: relative;
    width: 375px;
    max-width: 100vw;
    max-height: 667px;
    border: 1px solid black;
    border-radius: 20px;
    background: linear-gradient(to bottom, #0C1D3B, #3A4D82);
    overflow-x: hidden;
    overflow-y: auto;
  }



}


</style>
