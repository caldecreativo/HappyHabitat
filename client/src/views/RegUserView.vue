<template>
    <section>
        <form @submit.prevent="signUp" class="formView" action="">
            <div>
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'Brugernavn')" type="text"
                    id="username" v-model="user.userName" placeholder="Brugernavn" required />

            </div>
            <div>
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'email')" type="text" id="email"
                    v-model="user.email" placeholder="Email" required />
            </div>
            <div>
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'password')" type="text"
                    id="password" v-model="user.password" placeholder="Password" required />
            </div>
            <div>
                <input @focus="clearPlaceholder($event)" @blur="restorePlaceholder($event, 'Bekræft password')" type="text"
                    id="confirmPass" v-model="user.confirmPass" placeholder="Bekræft password" required />
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>


            <button type="submit" class="cornfirmBtn">Bekræft</button>
        </form>
    </section>
</template>

<script>
import router from "../router/index";
import axios from 'axios';




export default {
    data() {
        return {
            user: {
                userName: '',
                email: '',
                password: '',
                confirmPass: '',
            },
            errorMessage: '',
            statusMsg: '',

        };


    },
    methods: {

        clearPlaceholder(event) {
            event.target.placeholder = '';
        },

        restorePlaceholder(event, originalPlaceholder) {
            if (event.target.value === '') {
                event.target.placeholder = originalPlaceholder;
            }
        },

        validateUsername() {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?!.*['\s-])/;
            if (!this.user.userName) {
                this.errorMessage = 'Brugernavn er påkrævet.';
                return false;
            } else if (this.user.userName.length < 5) {
                this.errorMessage = 'Brugernavn skal være minimum 5 karaktere';
                return false;
            } else if (!regex.test(this.user.userName)) {
                this.errorMessage = 'Brugernavn skal indeholde ét stort bogstav, ét lille bogstav og må ikke indeholde apostrof, bindestreg eller mellemrum';
                return false;
            }
            return true;
        },



        async signUp() {
            this.errorMessage = '';

            const isUsernameValid = this.validateUsername();
            if (!isUsernameValid) {
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
                this.errorMessage = '';
                // Redirect to addFam
                await router.push("/vaelg-familie");


            } catch (err) {
                console.log("fail")
                console.log(this.user)
                console.log(err)
                this.errorMessage = err.message || "En fejl opstod under tilmelding";
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