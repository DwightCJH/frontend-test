export const getTextResponse = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: `You said: "${text}". This is a simulated bot response.`,
        type: 'bot',
      });
    }, 1000);
  });
};

export const getSpeechResponse = async (speech) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: `You spoke: "${speech}". This is a simulated bot response.`,
        type: 'bot',
      });
    }, 1000);
  });
};

export const getImageDescription = async (imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "This is a description of the photo you uploaded: A beautiful landmark!",
        type: 'bot',
      });
    }, 1000);
  });
};

export const getLocationDescription = async (latitude, longitude) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: `You're at coordinates (${latitude}, ${longitude}). Here's a nearby landmark: The Great Tower, a place with rich history and stunning views.`,
        type: 'bot',
      });
    }, 1000);
  });
};
