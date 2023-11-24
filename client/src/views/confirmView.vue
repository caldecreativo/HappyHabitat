<template>
    <div>
  <h1> {{ userName }}</h1>
  <h1> {{ familyName }}</h1>
  <router-link to="/login"><button type="submit">Bekræft</button></router-link>
</div>
</template>

<script>


export default {
    data() {
        return {
            userName: '',
            familyName: ''
        };
    },
    created() {
        this.fetchUserName();
        this.fetchFamilyName();

    },

    methods: {
        fetchUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            this.userName = user ? user.userName : '';
        },
        fetchFamilyName() {
        const familyName = localStorage.getItem('familyName');
        if (familyName) {
            this.familyName = familyName;
        }
    },

    }
    
}
</script>

<style>

</style>