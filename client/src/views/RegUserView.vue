<template>
    <section>
        <h2 class="regH2">Registrer bruger</h2>
        <form @submit.prevent="signUp" class="formView" action="">
            <div class="iconWrap">
                <font-awesome-icon class="circleIcon" icon="circle-info" style="color: #ffffff;"
                    @click="openInfoModal('username')" />
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'Brugernavn')" type="text"
                    id="username" v-model="user.userName" placeholder="Brugernavn" required />

            </div>
            <infoModal :isVisible="showInfoModal === 'username'" @close="showInfoModal = null">
                <h1>Brugernavn kræver:</h1>
                <p>Minimum 5 karaktere</p>
                <p>Ingen apostrof, mellemrum eller bindestreg</p>
            </infoModal>
            <div>

                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'johndoe@eksempel.dk')"
                    type="text" id="email" v-model="user.email" placeholder="johndoe@eksempel.dk" required />
            </div>
            <div class="iconWrap">
                <font-awesome-icon class="circleIcon" icon="circle-info" style="color: #ffffff;"
                    @click="openInfoModal('password')" />
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'password')" type="text"
                    id="password" v-model="user.password" placeholder="Password" required />
            </div>
            <infoModal :isVisible="showInfoModal === 'password'" @close="showInfoModal = null">
                <h1>Password kræver:</h1>
                <p>Minimum 8 karaktere</p>
                <p>Mindst ét lille bogstav, ét stort bogstav, ét tal og ét specialtegn.</p>
                <p>Ingen apostrof eller bindestreg</p>

            </infoModal>
            <div>

                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'Bekræft password')" type="text"
                    id="confirmPass" v-model="user.confirmPass" placeholder="Bekræft password" required />
            </div>

            <ErrorModal :isVisible="showErrorModal" :message="getErrorMessage" @close="closeErrorModal"></ErrorModal>



            <button type="submit" class="cornfirmBtn">Bekræft</button>
        </form>
    </section>
</template>

<script>
import router from "../router/index";
import axios from 'axios';
import ErrorModal from '../components/errorModal.vue';
import infoModal from '../components/infoModal.vue'
import { mapActions, mapGetters } from "vuex";


import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


export default {
    components: {
        infoModal,
        ErrorModal
    },
    data() {
        return {
            user: {
                userName: '',
                email: '',
                password: '',
                confirmPass: '',
            },
            showInfoModal: null,
            showErrorModal: false,
            statusMsg: '',

        };


    },
    computed: {
        appIcon() {
            return faCircleInfo
        },
        ...mapGetters(['getErrorMessage']),
    },
    methods: {
        ...mapActions(['validateUsername', 'validateEmail', 'validatePassword']),

        clearPlaceholder(event) {
            event.target.placeholder = '';
        },

        restorePlaceholder(event, originalPlaceholder) {
            if (event.target.value === '') {
                event.target.placeholder = originalPlaceholder;
            }
        },

        // Info modal
        openInfoModal(field) {
            this.showInfoModal = field;
        },

        closeErrorModal() {
            this.showErrorModal = false;
            this.$store.commit('ERROR_MESSAGE', '');
        },




        async signUp() {

            const isUsernameValid = await this.validateUsername(this.user.userName);
            if (!isUsernameValid) {
                this.showErrorModal = true;
                return;
            }
            const isEmailValid = await this.validateEmail(this.user.email);
            if (!isEmailValid) {
                this.showErrorModal = true;
                return;
            }
            const isPasswordValid = await this.validatePassword(this.user.password);
            if (!isPasswordValid) {
                this.showErrorModal = true;
                return;
            }


            // Check if passwords are the same
            if (this.user.password !== this.user.confirmPass) {
                this.errorMessage = "Passwords matcher ikke";
                return;
            }

            try {
                // User data to DB
                const response = await axios.post('http://localhost:8081/register', this.user)
                console.log(response)

                // Log hele responsobjektet for at se, hvad du modtager
                console.log('Server response:', response.data);

         
                // Save username to localstorage
                localStorage.setItem('userName', this.user.userName);
                


                // Redirect to addFam
                await router.push("/vaelg-familie");
                


            } catch (err) {
                console.log("fail")
                console.log(this.user)
                console.log(err)
                const errorMessage = "Der opstod fejl under registrering, prøv igen";
                this.$store.commit('ERROR_MESSAGE', errorMessage);
                this.showErrorModal = true;
            }
        }




    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

.regH2 {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;

}

.formView {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 42px;
    margin-top: 30px;
}

input {
    font-family: 'Quicksand', sans-serif;
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

.iconWrap {
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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
    margin-top: 20px;
    margin-bottom: 50px;

}

.circleIcon {
    font-size: 30px;
}
</style>