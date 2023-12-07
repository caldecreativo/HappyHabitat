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
import logo from '../components/logoComp.vue'
export default {
    components: {
        logo,
    },
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

  .frontBtn, .addToBtn {
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