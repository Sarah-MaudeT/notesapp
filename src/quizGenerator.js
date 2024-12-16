const API_ENDPOINT = 'https://8w7k0i50th.execute-api.ca-central-1.amazonaws.com/test/generate-quiz';

export async function generateQuiz(inputText, numberOfQuestions) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText, numberOfQuestions }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}