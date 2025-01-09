<template>
    <div class="conversation">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
        <div v-if="message.type === 'user'" class="message-content user">
          <p>{{ message.content }}</p>
        </div>
        <div v-else class="message-content bot">
          <p>{{ message.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
      };
    },
    methods: {
      addMessage(content, type) {
        this.messages.push({ content, type });
      },
    },
    created() {
      // Initial message when the app starts
      this.addMessage("Welcome to the Audio Guide! How can I assist you?", "bot");
    },
  };
  </script>
  
  <style scoped>
  .conversation {
    max-height: 70vh;
    overflow-y: auto;
    padding-bottom: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .message-content {
    padding: 10px;
    border-radius: 5px;
    max-width: 80%;
  }
  
  .user {
    text-align: right;
  }
  
  .bot {
    text-align: left;
    background-color: #e1f5fe;
  }
  
  .message-content.user {
    background-color: #cce7ff;
  }
  </style>
  