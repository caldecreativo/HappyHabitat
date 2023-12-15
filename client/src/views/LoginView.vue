<template>
    <section class="loginView">
        <logo></logo>
        <form class="formView" @submit.prevent="login">
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'email')" type="text" id="email"
                    v-model="email" placeholder="Email" required />
            </div>
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Password')" type="password"
                    id="password" v-model="password" placeholder="Password" required />
            </div>

            <div class="pLogin">
                <p>Glemt login?</p>
            </div>

            <ErrorModal :isVisible="showErrorModal" :message="getErrorMessage" @close="closeErrorModal"></ErrorModal>

            <div class="confirmBox">
                <button class="cornfirmBtn">Login</button>
            </div>
        </form>
    </section>
</template>
    

<script>
// Imports
import logo from '../components/logoComp.vue';
import router from '../router/index'
import axios from 'axios';
import ErrorModal from '../components/errorModal.vue';
import { mapActions, mapGetters } from "vuex";

export default {
    // Components
    components: {
        logo,
        ErrorModal
    },
    data() {
        return {
            // Object to store form input and variabel for modal
            email: '',
            password: '',
            showErrorModal: false,
        };
    },
    // Computed
    computed: {
        // Vuex getters for component
        ...mapGetters(['getErrorMessage'])
    },
    // Methods
    methods: {
        // Vuex actions for component
        ...mapActions(['validateEmail', 'validatePassword']),

        clearPlaceholder(event) {
            event.target.placeholder = '';
        },
        restorePlaceholder(event, originalPlaceholder) {
            if (event.target.value === '') {
                event.target.placeholder = originalPlaceholder;
            }
        },
        // Close modal
        closeErrorModal() {
            this.showErrorModal = false;
            this.$store.commit('ERROR_MESSAGE', '');
        },
        // Login
        async login() {
            // Validation
            const isEmailValid = await this.validateEmail(this.email);
            if (!isEmailValid) {
                this.showErrorModal = true;
                return;
            }
            const isPasswordValid = await this.validatePassword(this.password);
            if (!isPasswordValid) {
                this.showErrorModal = true;
                return;
            }

            try {
                console.log("trigger")

                // Post request to server with email and password as payload    
                const response = await axios.post('http://localhost:8081/login', {
                    email: this.email,
                    password: this.password,

                })
                console.log('Server response:', response);

                // Redirect
                await router.push("/rediger-bruger");

                // error handling
            } catch (err) {
                const errorMessage = "Fejl ved login";
                this.$store.commit('ERROR_MESSAGE', errorMessage);
                this.showErrorModal = true;
            }



        }



    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

.formView {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 50px;
}

input {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    width: 270px;
    height: 46px;
    background-color: white;
    border: none;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
}

input::placeholder {
    color: rgba(13, 30, 61, 0.7);


}

p {
    margin: 0;
}

.pLogin {
    font-family: 'Quicksand', sans-serif;
    font-weight: regular;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}


.cornfirmBtn {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    width: 126px;
    height: 46px;
    font-size: 20px;
    background-color: #37B0B0;
    color: white;
    border: none;
    border-radius: 10px;
    margin-bottom: 50px;


}

.confirmBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
</style>