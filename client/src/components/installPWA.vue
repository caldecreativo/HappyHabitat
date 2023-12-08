<template>
    <button @click="install" v-if="installationAvailable">Installer app</button>
  </template>
  
  <script>
  export default {
      data(){
          return {
              installationAvailable: false
          }
      },
      mounted() {
          window.addEventListener("beforeinstallprompt", event => {
              event.preventDefault(); // ask browser not to render any installion UI
              this.bipEvent = event;
              this.installationAvailable = true;
          })
      },
      methods:{
          install(){
              if(this.bipEvent) {
                  this.bipEvent.prompt();
              } 
              // else {
              //     alert("check for Add to homescreen (IOS) or install in your browser menu")
              // } 
          }
      }
  }
  </script>

<style scoped>
button {
    width: 160px;
    height: 46px;
    color: #324576;
    background-color: white ;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    font-size: 20px;
}


</style>