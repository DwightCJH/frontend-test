<template>
  <div class="flex flex-col h-screen bg-white">
    <header class="bg-white text-gray-800 p-6 shadow-lg rounded-b-3xl">
      <h1 class="text-3xl font-extrabold text-center text-red-600">AI Tour Guide</h1>
    </header>

    <main class="flex-grow overflow-y-auto p-6 space-y-6">
      <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
        <div class="text-center text-gray-800 space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto mb-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="text-2xl font-semibold">Welcome to your AI-powered tour!</p>
          <p class="mt-2 text-lg">Start by asking a question or capturing an image.</p>
        </div>
      </div>

      <div v-for="(message, index) in messages" :key="index" class="animate-fade-in-up">
        <div
          :class="[
            'p-4 rounded-xl max-w-4/5 shadow-lg',
            message.isUser ? 'bg-gray-100 text-gray-800 ml-auto' : 'bg-red-50 text-gray-800',
          ]"
        >
          {{ message.text }}
        </div>
        <img
          v-if="message.image"
          :src="message.image"
          alt="Captured image"
          class="mt-3 max-w-full h-auto rounded-xl shadow-md"
        />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-300 p-6 rounded-t-3xl">
      <div class="flex items-center justify-between mb-4">
        <button
          @click="handleMicrophoneClick"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          class="relative group touch-manipulation"
          type="button"
        >
          <div
            :class="[
              'p-3 rounded-full transition-all duration-300 ease-in-out transform',
              recording ? 'bg-red-600 scale-110' : 'bg-gray-200',
              'relative z-10'
            ]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              :class="[
                'h-7 w-7 transition-colors duration-300',
                recording ? 'text-white' : 'text-gray-700'
              ]" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
              />
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 10v2a7 7 0 01-14 0v-2M12 18.5V23"
              />
            </svg>
          </div>
          <div
            v-if="recording"
            class="absolute -inset-1 bg-red-100 rounded-full animate-pulse z-0"
          ></div>
          <span
            :class="[
              'absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs',
              recording ? 'text-red-600' : 'text-gray-500'
            ]"
          >
            {{ recording ? 'Recording...' : '' }}
          </span>
        </button>

        <button
          @click="captureImage"
          class="bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-full transition-all duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button
          @click="togglePause"
          :class="[
            'font-bold p-3 rounded-full transition-all duration-300 ease-in-out',
            isPaused ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
          ]"
        >
          <svg v-if="isPaused" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div class="flex">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-grow border-2 border-transparent rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-100 text-gray-800 placeholder-gray-500"
        />
        <button
          @click="sendMessage"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full ml-3 transition-all duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </footer>

    <input
      type="file"
      accept="image/*"
      capture="environment"
      ref="fileInput"
      class="hidden"
      @change="onImageCapture"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../store'
import { useGeolocation } from '@vueuse/core'

const store = useAppStore()
const userInput = ref('')
const { messages, isPaused } = store
const fileInput = ref(null)
const recording = ref(false)
const recognition = ref(null)
const isRecognitionSupported = ref(false)
const touchTimeout = ref(null)
const microphoneInitialized = ref(false)

const { coords, resume, pause } = useGeolocation()

onMounted(() => {
  resume()
  initializeSpeechRecognition()
})

onUnmounted(() => {
  pause()
  stopRecognition()
  if (touchTimeout.value) {
    clearTimeout(touchTimeout.value)
  }
})

const initializeSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || 
                           window.webkitSpeechRecognition || 
                           window.mozSpeechRecognition || 
                           window.msSpeechRecognition

  if (SpeechRecognition) {
    isRecognitionSupported.value = true
    recognition.value = new SpeechRecognition()
    
    recognition.value.continuous = false
    recognition.value.interimResults = true
    recognition.value.lang = 'en-US'

    recognition.value.onstart = () => {
      recording.value = true
      microphoneInitialized.value = true
    }

    recognition.value.onend = () => {
      recording.value = false
      if (recording.value) {
        try {
          recognition.value.start()
        } catch (e) {
          console.warn('Could not restart recording:', e)
        }
      }
    }

    recognition.value.onresult = (event) => {
      const result = event.results[event.results.length - 1]
      if (result.isFinal) {
        userInput.value = result[0].transcript
        sendMessage()
        stopRecognition()
      }
    }

    recognition.value.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use speech recognition.')
      }
      stopRecognition()
    }
  }
}

const handleMicrophoneClick = async () => {
  if (!isRecognitionSupported.value) {
    alert('Speech recognition is not supported in your browser.')
    return
  }

  try {
    if (!microphoneInitialized.value) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      microphoneInitialized.value = true
    }

    if (recording.value) {
      stopRecognition()
    } else {
      startRecognition()
    }
  } catch (error) {
    console.error('Microphone access error:', error)
    alert('Please allow microphone access to use speech recognition.')
  }
}

const handleTouchStart = (event) => {
  event.preventDefault()
  if (!recording.value) {
    touchTimeout.value = setTimeout(() => {
      handleMicrophoneClick()
    }, 150)
  }
}

const handleTouchEnd = (event) => {
  event.preventDefault()
  if (touchTimeout.value) {
    clearTimeout(touchTimeout.value)
  }
  if (recording.value) {
    stopRecognition()
  }
}

const startRecognition = async () => {
  if (!recognition.value) {
    initializeSpeechRecognition()
  }

  try {
    await recognition.value.start()
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      alert('Please allow microphone access to use speech recognition.')
    } else {
      console.error('Speech recognition error:', error)
    }
    recording.value = false
  }
}

const stopRecognition = () => {
  try {
    if (recognition.value) {
      recognition.value.stop()
      recording.value = false
    }
  } catch (error) {
    console.error('Error stopping recognition:', error)
  }
}

const sendMessage = () => {
  if (userInput.value.trim()) {
    store.addMessage({ text: userInput.value, isUser: true })
    setTimeout(() => {
      store.addMessage({
        text: `Response to: ${userInput.value}`,
        isUser: false,
      })
    }, 1000)
    userInput.value = ''
  }
}

const captureImage = () => {
  fileInput.value.click()
}

const onImageCapture = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageDataUrl = e.target.result
      store.addMessage({
        text: 'Image captured',
        isUser: true,
        image: imageDataUrl,
      })
      setTimeout(() => {
        store.addMessage({
          text: 'This image shows a beautiful landmark.',
          isUser: false,
        })
      }, 1500)
    }
    reader.readAsDataURL(file)
  }
}

const togglePause = () => {
  store.setPaused(!isPaused)
  if (isPaused) {
    resume()
  } else {
    pause()
  }
}

setInterval(() => {
  if (!isPaused && coords.value) {
    store.setCurrentLocation({
      latitude: coords.value.latitude,
      longitude: coords.value.longitude,
    })
    store.addMessage({
      text: `You are now at ${coords.value.latitude.toFixed(
        4
      )}, ${coords.value.longitude.toFixed(4)}. There's an interesting landmark nearby.`,
      isUser: false,
    })
  }
}, 30000)
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>