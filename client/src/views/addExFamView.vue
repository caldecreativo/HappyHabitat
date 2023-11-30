<template>
    <section class="addExFamView">
        <h1> {{ userName }}</h1>
        <form @submit.prevent="addExFam">
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Tilføj Familie')" type="text"
                    id="family" v-model="familyName" placeholder="Tilføj Familie" required />
            </div>

            <ErrorModal :isVisible="showErrorModal" :message="errorMessage" @close="closeErrorModal"></ErrorModal>
            
            <button type="submit">Tilføj</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import ErrorModal from '../components/errorModal.vue';

export default {
    components: {
        ErrorModal,
    },
    data() {
        return {
            familyName: '',
            userName: '',
            showErrorModal: false,
            errorMessage: ''
        };
    },
    created() {
        this.fetchUserName();
        this.fetchUserID();
    },

    methods: {
        clearPlaceholder(event) {
            event.target.placeholder = '';
        },
        restorePlaceholder(event) {
            if (event.target.value === '') {
                event.target.placeholder = 'Tilføj Familie';
            }
        },

        closeErrorModal() {
            this.showErrorModal = false;
            this.$store.commit('SET_ERROR_MESSAGE', '');
        },

        fetchUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            this.userName = user ? user.userName : '';
        },

        fetchUserID() {
            console.log("trig")
            const user = JSON.parse(localStorage.getItem('user'));
            this.userID = user ? user.userID : '';
        },

        async addExFam() {
            try {
                console.log("trigger")
                console.log(this.familyName)
                // virker!
                const response =await axios.post('http://localhost:8081/families/addToFamily', {
                    familyName: this.familyName,
                    userID: this.userID
                });
                console.log(response)

                // Hvis familien er oprettet succesfuldt, gem familyName i localStorage
                if (response && response.data) {
                    localStorage.setItem('familyName', this.familyName);
                    console.log('Familie tilføjet til localStorage');
                }

                await router.push("/bekraeft-bruger");

            } catch (error) {
                this.errorMessage = "Familie findes ikke";
                this.showErrorModal = true;
            }



        }



    }
}
</script>

<style></style>