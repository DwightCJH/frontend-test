import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    messages: [],
    isRecording: false,
    isPaused: false,
    currentLocation: null,
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
    },
    setRecording(isRecording) {
      this.isRecording = isRecording
    },
    setPaused(isPaused) {
      this.isPaused = isPaused
    },
    setCurrentLocation(location) {
      this.currentLocation = location
    },
  },
})