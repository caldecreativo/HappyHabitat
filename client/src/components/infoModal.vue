<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeInfoModal">
      <div class="modal-content">
        <slot></slot> 
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
    },
    methods: {
      closeInfoModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style>

body{
    font-family: 'Quicksand', sans-serif;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-content {
  width: auto; 
  max-width: 300px; 
  margin: auto;
  padding: 20px;
  background-color: white;
  border-radius: 20px; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1001; 
  background: linear-gradient(to bottom, #0C1D3B, #3A4D82);
  color: white;

}
  </style>