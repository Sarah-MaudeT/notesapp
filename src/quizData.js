const quizData = {
    title: "Space Quiz",
    questions: [
      {
        questionText: 'What is the largest planet in our solar system?',
        answerOptions: [
          { answerText: 'Mars', isCorrect: false },
          { answerText: 'Jupiter', isCorrect: true },
          { answerText: 'Saturn', isCorrect: false },
          { answerText: 'Neptune', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the name of the galaxy containing our solar system?',
        answerOptions: [
          { answerText: 'Andromeda', isCorrect: false },
          { answerText: 'Milky Way', isCorrect: true },
          { answerText: 'Sombrero', isCorrect: false },
          { answerText: 'Whirlpool', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the closest star to Earth?',
        answerOptions: [
          { answerText: 'Proxima Centauri', isCorrect: false },
          { answerText: 'Alpha Centauri', isCorrect: false },
          { answerText: 'The Sun', isCorrect: true },
          { answerText: 'Sirius', isCorrect: false },
        ],
      },
      {
        questionText: 'How many planets are in our solar system?',
        answerOptions: [
          { answerText: '7', isCorrect: false },
          { answerText: '8', isCorrect: true },
          { answerText: '9', isCorrect: false },
          { answerText: '10', isCorrect: false },
        ],
      },
    ]
  };
  
  export default quizData;