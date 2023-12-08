<template>
    <div class="confirmFam">
        <logo></logo>
        <h1> "{{ userName }}"</h1>
        <h1> "{{ familyName }}"</h1>

            <h2>Super! <br> Dit nye eventyr venter. <br> Bekræft og derefter log ind <br> for at fortætte rejsen.</h2>

        <div class="confrimBtnBox">
            <router-link to="/login"><button class="cornfirmBtn" type="submit">Bekræft</button></router-link>
        </div>
    </div>
</template>

<script>
import logo from '../components/logoComp.vue'

export default {
    components: {
        logo,
    },
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
            const userName = localStorage.getItem('userName');
            if (userName) {
                this.userName = userName;
            }
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

<style scoped>
.confirmFam {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

h2 {
    text-align: center;
    color: white;
    margin-top: 50px;
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

.confrimBtnBox {
    margin-top: 50px;
}
</style>