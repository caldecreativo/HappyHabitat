<template>
    <section class="addNewFamView">
        <h1> {{  userName }}</h1>
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
        console.log("trigger")
        console.log(this.familyName)
        // virker!
        await axios.post('http://localhost:8081/families/register', {
            familyName: this.familyName, 
            userID: this.userID
        })

}

        // Trin for trin
        // 1. get user id fra localstorage
        // 2. lav post request med familie i Q :familyName
        // 3. Send userID i param
        
    }
}
</script>

<style></style>