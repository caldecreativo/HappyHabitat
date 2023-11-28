<template>
    <section class="loginView">
        <form class="formView" @submit.prevent="login">
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'email')" type="text" id="email"
                    v-model="email" placeholder="Email" required />
            </div>
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Password')" type="text"
                    id="password" v-model="password" placeholder="Password" required />
            </div>

            <div class="confirmBox">
                <button class="cornfirmBtn">Login</button>
            </div>
        </form>
    </section>
</template>
    

<script>
import router from '../router/index'
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
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

        async login() {
            try {
                console.log("trigger")
            // virker ikke!
            const response =await axios.post('http://localhost:8081/login', {
                email: this.email,
                password: this.password
            })
            
            
            // Save user & token in localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            
            if (response.data.userToken) {
                localStorage.setItem('token', response.data.userToken);
            }

            await router.push("/rediger-bruger");

            } catch(err) {
                console.log(err);
            }
            


        }



    }
}
</script>


<style scoped>
.formView {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 40px;
}

input {
    font-family: 'Amatic SC', sans-serif;
    width: 260px;
    height: 65px;
    background-color: #416DA1;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 55px;
    text-align: center;

}

input::placeholder {
    color: white;
    opacity: 1;
    /* Fjerner gennemsigtighed */
}


.cornfirmBtn {
    font-family: 'Amatic SC', sans-serif;
    width: 130px;
    height: 70px;
    font-size: 55px;
    background-color: #DC582D;
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 20px;

}

.confirmBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}
</style>