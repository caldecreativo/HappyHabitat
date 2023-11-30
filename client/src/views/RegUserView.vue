<template>
    <section>
        <form @submit.prevent="signUp" class="formView" action="">
            <div>
                <font-awesome-icon icon="circle-info" style="color: #ffffff;" @click="openInfoModal('username')" />
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'Brugernavn')" type="text"
                    id="username" v-model="user.userName" placeholder="Brugernavn" required />

            </div>
            <infoModal :isVisible="showInfoModal === 'username'" @close="showInfoModal = null">
                <h1>Brugernavn kræver:</h1>
                <p>Minimum 5 karaktere</p>
                <p>Ingen apostrof, mellemrum eller bindestreg</p>
            </infoModal>
            <div>

                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'johndoe@eksempel.dk')" type="text" id="email"
                    v-model="user.email" placeholder="johndoe@eksempel.dk" required />
            </div>
            <div>
                <font-awesome-icon icon="circle-info" style="color: #ffffff;" @click="openInfoModal('password')" />
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
            this.$store.commit('SET_ERROR_MESSAGE', '');
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


                // Save user & token in localStorage
                localStorage.setItem('user', JSON.stringify(response.data));

                if (response.data.userToken) {
                    localStorage.setItem('token', response.data.userToken);
                }
                // 
                // Redirect to addFam
                await router.push("/vaelg-familie");


            } catch (err) {
                console.log("fail")
                console.log(this.user)
                console.log(err)
                const errorMessage = "Der opstod fejl under registrering, prøv igen";
                this.$store.commit('SET_ERROR_MESSAGE', errorMessage);
                this.showErrorModal = true;
            }
        }




    }
};
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
    /* font-family: 'Amatic SC', sans-serif; */
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
    opacity: 1;
    /* Fjerner gennemsigtighed */
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