<template>
    <section >
        <form class="formView" action="">
            <div>
                <input  
                @focus="clearPlaceholder($event)" 
                @blur="restorePlaceholder($event, 'Brugernavn')"
                type="text" id="username" 
                v-model="username" 
                placeholder="Brugernavn" 
                required/>
            </div>
            <div>
                <input 
                @focus="clearPlaceholder($event)" 
                @blur="restorePlaceholder($event, 'email')"
                type="text" 
                id="email" 
                v-model="email" 
                placeholder="Email" 
                required/>
            </div>
            <div>
                <input
                @focus="clearPlaceholder($event)" 
                @blur="restorePlaceholder($event, 'password')" 
                type="text" 
                id="password" 
                v-model="password" 
                placeholder="Password" 
                required/>
            </div>
            <div>
                <input 
                @focus="clearPlaceholder($event)" 
                @blur="restorePlaceholder($event, 'Bekræft password')"
                type="text" 
                id="confirmPass" 
                v-model="confirmPass" 
                placeholder="Bekræft password" 
                required/>
            </div>


            <router-link to="/tilføj-familie"><button class="cornfirmBtn">Bekræft</button></router-link>
        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPass = ref('');

const clearPlaceholder = (event) => {
  event.target.placeholder = '';
};

const restorePlaceholder = (event, originalPlaceholder) => {
  if (event.target.value === '') {
    event.target.placeholder = originalPlaceholder;
  }
};

// const submitForm = () => {
//   if (password.value !== confirmPass.value) {
//     alert('Adgangskoderne matcher ikke.');
//     return;
//   }
//   // Her kan du indsætte logik for at håndtere indsendelse af formular, fx sende til en server.
//   alert('Formular indsendt!');
// };
</script>


<style scoped>

.formView {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-top: 30px;
}

input {
    font-family: 'Amatic SC', sans-serif;
    width: 200px;
    height: 50px;
    background-color: #416DA1;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 30px;
    text-align: center;
    
}

input::placeholder {
  color: white;
  opacity: 1; /* Fjerner gennemsigtighed */
}

.cornfirmBtn {
    font-family: 'Amatic SC', sans-serif;
    width: 80px;
    height: 40px;
    font-size: 30px;
    background-color: #DC582D;
    color: white;
    border: none;
    border-radius: 10px;

}


</style>