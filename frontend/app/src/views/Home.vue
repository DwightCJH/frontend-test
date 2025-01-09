<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 class="text-4xl font-bold mb-8">SG Buddy</h1>
      <router-link
        to="/chat"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Start Tour
      </router-link>
      <router-link
        to="/history"
        class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        View Travel Journal!
      </router-link>
    </div>
  </template>
  
  <script setup>
  // No additional logic needed here
  </script>