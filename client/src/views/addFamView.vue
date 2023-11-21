<template>
    <section class="addFamView">
        <h1>Brugernavn</h1>
        <form @submit.prevent="submitForm">
            <div>
                <input 
                    @focus="clearPlaceholder" 
                    @blur="event => restorePlaceholder(event, 'Tilføj Familie')" 
                    type="text"
                    id="family" 
                    v-model="family" 
                    placeholder="Tilføj Familie" 
                    required />
            </div>
            <button type="submit">Tilføj</button>
        </form>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const family = ref('');

const clearPlaceholder = (event) => {
    event.target.placeholder = '';
};

const restorePlaceholder = (event, originalPlaceholder) => {
    if (event.target.value === '') {
        event.target.placeholder = originalPlaceholder;
    }
};

const submitForm = () => {
    // Her kan du indsætte logik for at håndtere indsendelse af formular, fx sende til en server.
    alert('Familie tilføjet!');
};
</script>

<style></style>