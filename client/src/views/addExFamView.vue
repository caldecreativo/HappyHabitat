<template>
    <section class="addExFamView">
        <h1> {{  userName }}</h1>
        <form @submit.prevent="addExFam">
            <div>
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Tilføj Familie')" type="text"
                    id="family" v-model="familyName"  placeholder="Tilføj Familie" required />
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

        async addExFam() {
        console.log("trigger")
        console.log(this.familyName)
        // virker ikke!
        await axios.post('http://localhost:8081/families/addToFamily', {
            familyName: this.familyName,
            userID: this.userID
        
        })
        

}


        
    }
}
</script>

<style></style>