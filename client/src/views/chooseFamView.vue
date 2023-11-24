<template>
    <section class="chooseFamView">
        <h1> {{  userName }}</h1>
        <div class="btnBox">
        <router-link to="/ny-familie"><button class="frontBtn">Lav ny familie</button></router-link>
        <router-link to="/tilfoj-eksisterende-familie"><button class="frontBtn">Tilføj eksisterende familie</button></router-link>
      </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
        };
    },
    created() {
        this.fetchUserName();
    },
    methods: {
        fetchUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            this.userName = user ? user.userName : '';
        },

        
    }
    

}
</script>

<style>
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

</style>