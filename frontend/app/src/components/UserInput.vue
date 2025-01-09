<!-- src/components/UserInput.vue -->
<template>
    <div class="user-input">
      <textarea v-model="userMessage" placeholder="Type your message..." @keydown.enter="sendTextMessage" rows="2"></textarea>
      
      <div class="input-actions">
        <button @click="startSpeechRecognition">🎙️</button>
        <button @click="uploadPhoto">📷</button>
      </div>
      
      <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handlePhotoUpload" />
    </div>
  </template>
  
  <script>
  import { getTextResponse, getSpeechResponse, getImageDescription, getLocationDescription } from '../MockApi.js';
  
  export default {
    data() {
      return {
        userMessage: '',
        photoDescription: '',
      };
    },
    methods: {
      sendTextMessage() {
        if (this.userMessage.trim()) {
          this.$emit('add-message', this.userMessage, 'user');
          this.userMessage = ''; // Clear input after sending
  
          // Simulate bot response for text
          getTextResponse(this.userMessage).then(response => {
            this.$emit('add-message', response.message, response.type);
          });
        }
      },
  
      startSpeechRecognition() {
        // Simulate the process of speech-to-text and get bot response
        const speech = "Simulated speech input"; // You can replace this with actual speech recognition data
        getSpeechResponse(speech).then(response => {
          this.$emit('add-message', speech, 'user');
          this.$emit('add-message', response.message, response.type);
        });
      },
  
      uploadPhoto() {
        this.$refs.fileInput.click();
      },
  
      handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const photoURL = URL.createObjectURL(file);
          this.$emit('add-message', `You uploaded a photo: ${photoURL}`, 'user');
  
          // Simulate image-to-text description
          getImageDescription(file).then(response => {
            this.$emit('add-message', response.message, response.type);
          });
        }
      },
  
      trackLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
  
            // Simulate location-based description
            getLocationDescription(latitude, longitude).then(response => {
              this.$emit('add-message', response.message, response.type);
            });
          });
        }
      },
    },
  
    created() {
      this.trackLocation();
    },
  };
  </script>
  
  
  <style scoped>
  .user-input {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  
  textarea {
    resize: none;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .input-actions {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
  }
  </style>
  