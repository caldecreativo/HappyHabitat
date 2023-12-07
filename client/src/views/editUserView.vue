<template>
    <section class="editSection">
    <div class="menuHeader">
      <font-awesome-icon class="icons" :icon="xmarkIcon"></font-awesome-icon>
      <span>Konto</span>
      <font-awesome-icon class="icons" :icon="circleQuestionIcon"></font-awesome-icon>
    </div>
    <hr class="divider" />
    <div class="userImg">
      <img :src="userImage" alt="Bruger billede" class="userAvatar">
    </div>
    <div class="menu-section" v-for="section in menuSections" :key="section.title">
      <h2>{{ section.title }}</h2>
      <button class="menu-item" v-for="item in section.items" :key="item.text" @click="item.action">
        {{ item.text }}
        <font-awesome-icon class="angleUp" :icon="angleUpIcon"></font-awesome-icon>
      </button>
    </div>
      <!-- <router-link to="opdater-bruger"><button>Opdater bruger</button></router-link> -->
    </section>
  </template>
  
  <script>
  import router from '../router/index';
  import axios from 'axios';
  import { faAngleUp, faCircleQuestion, faXmark } from '@fortawesome/free-solid-svg-icons';
  
  export default {
    data() {
      return {
        userImage: require('../assets/headPingvin.png'),
        menuSections: [
        {
          title: 'Konto',
          items: [
            { text: 'Opdater bruger', action: this.updateUser },
            { text: 'Slet bruger', action: this.confirmDelete },
            { text: 'Log ud', action: this.confirmLogout }
          ]
        },
        {
          title: 'Info',
          items: [
            { text: 'FAQs', action: this.showFAQs }
          ]
        },
        {
          title: 'Diverse',
          items: [
            { text: 'Servicevilkår', action: this.showTerms },
            { text: 'Privat politik', action: this.showPrivacyPolicy }
          ]
        }
      ]
        // { text: 'FAQs', action: this.showFAQs },
        // { text: 'Servicevilkår', action: this.showTerms },
        // { text: 'Privat politik', action: this.showPrivacyPolicy },
      
      };
    },
    computed: {
      angleUpIcon() {
    return faAngleUp;
  },
  circleQuestionIcon() {
    return faCircleQuestion;
  },
  xmarkIcon() {
    return faXmark;
  }
      },


      
  
    methods: {

      updateUser() {
    router.push('/opdater-bruger');
  },

        
      async confirmLogout() {
        const isConfirmed = window.confirm('Er du sikker på, at du vil logge ud?');
        if (isConfirmed) {
          try {
            this.user = null;
            await router.push('/')
          } catch (error) {
            console.error('Fejl ved logud:', error);
          }
        }
        // // Log ud og fjern lokale oplysninger
        // this.user = null;
        // localStorage.removeItem('user');
        // localStorage.removeItem('familyName');
        // deleteCookie('JWT');
        // await router.push('/');
      },

  
      async confirmDelete() {
  // Vis en bekræftelsesdialog for at slette brugeren
  const isConfirmed = window.confirm('Er du sikker på, at du vil slette din konto?');

  if (isConfirmed) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('User ID from localStorage:', user.userID);
      
      // Send en DELETE-anmodning til serveren for at slette brugeren med det rigtige bruger-ID
      const response = await axios.delete(`http://localhost:8081/deleteUser/${user.userID}`);

      if (response.status === 200) {
        // Slet lokale oplysninger og log ud
        this.logout();
      } else {
        // Håndter fejl ved sletning
        console.error('Fejl ved sletning af bruger');
      }
    } catch (error) {
      // Håndter fejl ved sletning
      console.error('Fejl ved sletning af bruger:', error);
    }
  }
}
    },
  };
  </script>

<style scoped>

span {
  font-size: 20px;
  font-weight: bold;
}

.divider {
  border: none; 
  height: 1px; 
  background-color: white; 
  margin-left: 20px;
  margin-right: 20px;
}

.userImg {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.userAvatar {
  width: 90px;
  height: 80;
}
.menus {
  display: flex;
  flex-direction: column;
}


.menuHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;

}



.user-avatar {
  width: 100px; 
  height: 100px; 
  margin: 20px auto;
  border-radius: 50%;
}

.menu-section h2 {
  font-size: 20px;
  margin: 0;
  margin-left: 20px;
  color: white;
}

.menu-item {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 5px 20px; 
  background-color: #37B0B0;
  margin: 18px 0;
  margin-left: 20px;
  border-radius: 15px;
  border: none;
  width: 330px;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box; 
}


.icons {
font-size: 24px;
}

.angleUp {
  transform: rotate(90deg); 
  color: #363888;
}

.editSection {
  overflow: hidden;
}
</style>