<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeInfoModal">
      <div class="modal-content">
        <slot></slot> <!-- Her indsættes dynamisk indhold -->
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
.modal-overlay {
  position: absolute; /* Ændret til absolute for at være i forhold til #app */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Værdi høj nok til at ligge over andre elementer */
}

.modal-content {
  width: 90%; /* Tilpasset bredde til mobilvisning */
  max-width: 300px; /* Maksimal bredde baseret på #app bredde */
  padding: 20px;
  background-color: white;
  border-radius: 20px; /* Tilpasset til #app's border-radius */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1001; /* Sørger for at modalen ligger over overlayet */

}
  </style>