<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Tour History</h1>
      <div v-for="(tour, index) in tours" :key="index" class="mb-6 bg-white shadow rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2">{{ tour.date }}</h2>
        <div v-for="(message, msgIndex) in tour.messages" :key="msgIndex" class="mb-2">
          <div
            :class="[
              'p-2 rounded-lg',
              message.isUser ? 'bg-blue-100' : 'bg-gray-100',
            ]"
          >
            {{ message.text }}
          </div>
          <img
            v-if="message.image"
            :src="message.image"
            alt="Tour image"
            class="mt-2 max-w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Simulated tour history data
  const tours = ref([
    {
      date: '2023-04-15',
      messages: [
        { text: 'Started tour at the city center', isUser: false },
        { text: 'What\'s that building?', isUser: true },
        { text: 'That\'s the historic town hall, built in 1850.', isUser: false },
        {
          text: 'Here\'s a photo I took',
          isUser: true,
          image: 'https://via.placeholder.com/300',
        },
      ],
    },
    {
      date: '2023-04-10',
      messages: [
        { text: 'Beginning the nature trail tour', isUser: false },
        { text: 'Tell me about the local flora', isUser: true },
        { text: 'The area is known for its diverse plant life, including...', isUser: false },
      ],
    },
  ])
  </script>