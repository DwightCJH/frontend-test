// src/mockApi.js

// Mock function to simulate text-based response
export const getTextResponse = (text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: `You said: "${text}". This is a simulated bot response.`,
          type: 'bot',
        });
      }, 1000); // Simulate network delay
    });
  };
  
  // Mock function to simulate speech-to-text conversion
  export const getSpeechResponse = (speech) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: `You spoke: "${speech}". This is a simulated bot response.`,
          type: 'bot',
        });
      }, 1000);
    });
  };
  
  // Mock function to simulate image description generation
  export const getImageDescription = (imageData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "This is a description of the photo you uploaded: A beautiful landmark!",
          type: 'bot',
        });
      }, 1000);
    });
  };
  
  // Mock function to simulate location-based response
  export const getLocationDescription = (latitude, longitude) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: `You're at coordinates (${latitude}, ${longitude}). Here's a nearby landmark: The Great Tower, a place with rich history and stunning views.`,
          type: 'bot',
        });
      }, 1000);
    });
  };
  