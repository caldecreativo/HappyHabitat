<template>
    <button @click="install" v-if="installationAvailable">Installer app</button>
  </template>
  
  <script>
  export default {
      data(){
          return {
            // See if app installation is available
              installationAvailable: false
          }
      },
      // Lifecycle hook called after component is mounted
      mounted() {
        // Eventlistner for beforeinstallation event
          window.addEventListener("beforeinstallprompt", event => {
              event.preventDefault(); // ask browser not to render any installion UI
              this.bipEvent = event; // Store event for later use
              this.installationAvailable = true; // Indicate installation is avaiable
          })
      },
      methods:{
        // Method to trigger app install process
          install(){
            // checks if install is stored
              if(this.bipEvent) {
                  this.bipEvent.prompt(); // show install promt to user
              } 
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