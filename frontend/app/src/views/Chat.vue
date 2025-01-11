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
            'p-4 rounded-xl max-w-4/5 shadow-lg flex items-center justify-between',
            message.isUser ? 'bg-gray-100 text-gray-800 ml-auto' : 'bg-red-50 text-gray-800',
          ]"
        >
          <span>{{ message.text }}</span>
          <button
            v-if="!message.isUser"
            @click="replayAudio(message.text)"
            class="ml-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          </button>
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
          @click="toggleRecording"
          class="relative group"
        >
          <div
            :class="[
              'p-3 rounded-full transition-all duration-300 ease-in-out',
              recording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-200 hover:bg-gray-300',
              'relative z-10'
            ]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              :class="[
                'h-7 w-7 transition-colors duration-300',
                recording ? 'text-white' : 'text-gray-700'
              ]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div
            v-if="recording"
            class="absolute -inset-1 bg-red-100 rounded-full animate-pulse z-0"
          ></div>

          <span
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {{ recording ? 'Stop Recording' : 'Start Recording' }}
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
// import { getTextResponse, getSpeechResponse, getImageDescription, getLocationDescription } from '../MockApi'
import imageCompression from 'browser-image-compression'

const store = useAppStore()
const userInput = ref('')
const { messages, isPaused } = store
const fileInput = ref(null)
const recording = ref(false)

const { coords, resume, pause } = useGeolocation()

const recognition = ref(null)
const isRecognitionSupported = ref(false)
const synth = window.speechSynthesis
const utterance = ref(null)

//for visited places 
const visitedPlaces = ref([])

onMounted(() => {
  resume()
  checkSpeechRecognitionSupport()
  const storedPlaces = JSON.parse(sessionStorage.getItem('visitedPlaces')) || []
  visitedPlaces.value = storedPlaces
})

const updateVisitedPlaces = (newPlace) => {
  if (!visitedPlaces.value.includes(newPlace)) {
    visitedPlaces.value.push(newPlace) // Update the reactive array
    sessionStorage.setItem('visitedPlaces', JSON.stringify(visitedPlaces.value)) // Save to sessionStorage
  }
}

onUnmounted(() => {
  pause()
  stopRecognition()
  stopSpeech()
})

const checkSpeechRecognitionSupport = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    isRecognitionSupported.value = true
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition.value = new SpeechRecognition()
    recognition.value.continuous = true
    recognition.value.interimResults = true

    recognition.value.onstart = () => {
      recording.value = true
    }

    recognition.value.onend = () => {
      recording.value = false
    }

    recognition.value.onresult = async (event) => {
      const result = event.results[event.results.length - 1]
      if (result.isFinal) {
        const speech = result[0].transcript
        store.addMessage({ text: speech, isUser: true })
        try {
          const latitude = coords.value.latitude
          const longitude = coords.value.longitude
          const location = `${latitude},${longitude}`

          const payload = {
            text: speech,
            location: location,
          }
          console.log(location)

          const response = await fetch('https://ggdotcom.onrender.com/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })

          if (!response.ok) {
            throw new Error('Failed to get response from backend')
          }

          const data = await response.json()
          store.addMessage({ text: data.response, isUser: false })
          speakText(data.response)

        } catch (error) {
          store.addMessage({ text: "Error getting response.", isUser: false })
          console.error("Error getting response:", error)
        }
      }
    }

    recognition.value.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      stopRecognition()
    }
  }
}

const toggleRecording = () => {
  if (!isRecognitionSupported.value) {
    alert('Speech recognition is not supported in your browser.')
    return
  }

  if (recording.value) {
    stopRecognition()
  } else {
    startRecognition()
  }
}

const startRecognition = () => {
  if (recognition.value) {
    try {
      recognition.value.start()
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('Please allow microphone access to use speech recognition.')
      } else {
        console.error('Speech recognition error:', error)
      }
    }
  }
}

const stopRecognition = () => {
  if (recognition.value) {
    recognition.value.stop()
  }
}

const sendMessage = async () => {
  if (userInput.value.trim()) {
    const messageText = userInput.value.trim()
    userInput.value = ''
    store.addMessage({ text: messageText, isUser: true })

    try {
      const latitude = coords.value.latitude
      const longitude = coords.value.longitude
      const location = `${latitude},${longitude}`
      console.log(location)
      console.log(`Visited Places are ${visitedPlaces.value}`)

      const payload = {
        text: messageText,
        location: location,
        visitedPlaces: visitedPlaces.value, 
      }

      const response = await fetch('https://ggdotcom.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from backend')
      }

      const data = await response.json()

      // Process the response and update visitedPlaces
      console.log(data.response)
      store.addMessage({ text: data.response, isUser: false })
      speakText(data.response)

      if (data.location) {
        updateVisitedPlaces(data.location) // Update visited places with new location
      }
    } catch (error) {
      store.addMessage({ text: "Error getting response.", isUser: false })
      console.error("Error getting response:", error)
    }
  }
}


// handling images
const captureImage = () => {
  fileInput.value.click()
}

const getImageDescription = async (imageDataUrl, location) => {
  try {
    console.log(imageDataUrl);
    console.log(location)

    const payload = {
      image: imageDataUrl,
      location: location,
    };

    const response = await fetch('https://ggdotcom.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Error sending image to backend');
    }

    const data = await response.json();

    console.log('Response from backend:', data);

    return data;
  } catch (error) {
    console.error('Error during image description fetch:', error);
    return { message: 'Error processing image' };
  }
};



const onImageCapture = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      // Compress the image before sending
      const options = {
        maxSizeMB: 0.75,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageDataUrl = e.target.result;

        // Get the user's current location
        const latitude = coords.value.latitude;
        const longitude = coords.value.longitude;
        const location = `${latitude},${longitude}`;

        // Add a message for the image capture
        store.addMessage({
          text: 'Image captured and compressed',
          isUser: true,
          image: imageDataUrl,
        });

        try {
          // Send the compressed image and location to the backend
          const response = await getImageDescription(imageDataUrl, location);

          // Log the backend response for debugging
          console.log('Backend response:', response);

          // Add the response message to the store
          store.addMessage({ text: response.response, isUser: false });

          console.log(`response is ${response.response}`)
          // Convert the message text to speech
          speakText(response.response);
        } catch (error) {
          store.addMessage({ text: "Error processing image.", isUser: false });
          console.error("Image processing error:", error);
        }
      };

      reader.onerror = () => {
        console.error("File reading error.");
        store.addMessage({ text: "Failed to read image file.", isUser: false });
      };

      reader.readAsDataURL(compressedFile); // Read the compressed file as a data URL
    } catch (error) {
      console.error("Compression error:", error);
      store.addMessage({ text: "Error compressing image.", isUser: false });
    }
  }
};



const togglePause = () => {
  store.setPaused(!isPaused)
  if (isPaused) {
    resume()
  } else {
    pause()
  }
}

const speakText = (text) => {
  stopSpeech()
  utterance.value = new SpeechSynthesisUtterance(text)
  synth.speak(utterance.value)
}

const stopSpeech = () => {
  if (synth.speaking) {
    synth.cancel()
  }
}

const replayAudio = (text) => {
  speakText(text)
}

// setInterval(async () => {
//   if (!isPaused && coords.value) {
//     store.setCurrentLocation({
//       latitude: coords.value.latitude,
//       longitude: coords.value.longitude,
//     })
//     try {
//       const response = await getLocationDescription(coords.value.latitude, coords.value.longitude)
//       store.addMessage({ text: response.message, isUser: false })
//       speakText(response.message)
//     } catch (error) {
//       console.error("Error getting location description:", error)
//     }
//   }
// }, 30000) 
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
