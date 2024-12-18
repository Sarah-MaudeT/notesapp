// API endpoint for quiz generation
const API_ENDPOINT = 'you API Gateway invoke URL'; //Change for your real invoke URL

// Function to generate a quiz
export async function generateQuiz(inputText, numberOfQuestions) {
  try {
    // Send POST request to API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText, numberOfQuestions }),
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    // Return parsed JSON response
    return await response.json();
  } catch (error) {
    // Log and re-throw any errors
    console.error('Error generating quiz:', error);
    throw error;
  }
}