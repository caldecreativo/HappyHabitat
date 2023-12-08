<template>
    <section class="addNewFamView">
        <logo></logo>
        <div class="iconWrap">
            <font-awesome-icon class="circleIcon" icon="circle-info" style="color: #ffffff;" @click="openInfoModal('family')" />
            <h1>Tilføj ny familie</h1>
        </div>
        <form class="formView" @submit.prevent="addNewFam">
            <div class="newFam">
                <input @focus="clearPlaceholder" @blur="event => restorePlaceholder(event, 'Tilføj Familie')" type="text"
                    id="family" v-model="familyName" placeholder="Tilføj Familie" required />
            </div>

            <infoModal :isVisible="showInfoModal === 'family'" @close="showInfoModal = null">
                <h1>Familienavn kræver:</h1>
                <p>Minimum 5 karaktere</p>
                <p>Ingen apostrof, mellemrum eller bindestreg</p>
            </infoModal>

            <h2>Start jeres fælles rejse!</h2>

            <ErrorModal :isVisible="showErrorModal" :message="getErrorMessage" @close="closeErrorModal"></ErrorModal>


            <button class="cornfirmBtn" type="submit">Tilføj</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import ErrorModal from '../components/errorModal.vue';
import { mapActions, mapGetters } from "vuex";
import logo from '../components/logoComp.vue'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import infoModal from '../components/infoModal.vue'

export default {
    components: {
        infoModal,
        ErrorModal,
        logo,
    },
    data() {
        return {
            familyName: '',
            userName: '',
            showInfoModal: null,
            showErrorModal: false,
            userID: null,
            
        };
    },
    created() {
        this.fetchUserName();
        this.fetchUserID();
    },
    computed: {
        appIcon() {
            return faCircleInfo
        },

        ...mapGetters(['getErrorMessage']),
    },


    methods: {
        ...mapActions(['validateFamName']),

                // Info modal
                openInfoModal(field) {
            this.showInfoModal = field;
        },

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
},



        fetchUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            this.userName = user ? user.userName : '';
        },

        // fetchUserID() {
        //     console.log("trig")
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     this.userID = user ? user.userID : '';
        // },


        async fetchUserID() {
            try {
                const response = await axios.get('http://localhost:8081/getCookie', {
                    withCredentials: true
                })
                console.log(response.data)
                this.userID = response.data.userID
                console.log(this.userID)
            } catch(err) {
                console.error(err)
            }
        },



        async addNewFam() {

            const isFamnameValid = await this.validateFamName(this.familyName);
            if (!isFamnameValid) {
                this.showErrorModal = true;
                return;
            }

            console.log("Anmodning sendes med følgende data:", { familyName: this.familyName, userID: this.userID });

            

            try {
                console.log("trigger")
                console.log(this.familyName)
                
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
                const errorMessage = "Fejl ved oprettelse af familie, prøv igen";
                this.$store.commit('ERROR_MESSAGE', errorMessage);
                this.showErrorModal = true;


            }


        }
    }
}
</script>

<style scoped>
.hhLogo {
    margin-bottom: 50px;
}

input {
    font-family: 'Quicksand', sans-serif;
    width: 235px;
    height: 46px;
    background-color: white;
    border: none;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    
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
    margin-top: 20px;
    margin-bottom: 50px;

}

.formView {

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 50px;
margin-top: 30px;
}

.iconWrap{
    margin-top: 20px;
    margin-left: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

}

.circleIcon{
    font-size: 30px;
}

</style>