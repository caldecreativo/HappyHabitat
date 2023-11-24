<template>
    <section class="addNewFamView">
        <h1> {{ userName }}</h1>
        <form @submit.prevent="addNewFam">
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Tilføj Familie')" type="text"
                    id="family" v-model="familyName" placeholder="Tilføj Familie" required />
            </div>
            <button type="submit">Tilføj</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
    data() {
        return {
            familyName: '',
            userName: '',
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

        fetchUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            this.userName = user ? user.userName : '';
        },

        fetchUserID() {
            console.log("trig")
            const user = JSON.parse(localStorage.getItem('user'));
            this.userID = user ? user.userID : '';
        },

        async addNewFam() {
            try {
                console.log("trigger")
                console.log(this.familyName)
                // virker!
                const response = await axios.post('http://localhost:8081/families/register', {
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
                console.error('Fejl ved oprettelse af familie:', error);

            }


        }
    }
}
</script>

<style></style>