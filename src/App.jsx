import React, { useState } from 'react';
import './App.css';
import { generateQuiz } from './quizGenerator';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [inputText, setInputText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(4);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const generatedQuiz = await generateQuiz(inputText, numberOfQuestions);
      setQuizData(generatedQuiz);
      resetQuiz();
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setError("Failed to generate quiz. Please try again.");
    }
    setIsGenerating(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFeedback(null);
    setAnswered(false);
    setShowNextButton(false);
  };

  const handleAnswerClick = (isCorrect) => {
    if (!answered) {
      setAnswered(true);
      if (isCorrect) {
        setScore(score + 1);
        setFeedback('Correct!');
      } else {
        setFeedback('Incorrect!');
      }
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setAnswered(false);
    setShowNextButton(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    resetQuiz();
    setQuizData(null);
    setInputText('');
  };

  return (
    <div className="app">
      <div className="menu-bar">
        <div className="menu-title">QuizTime!!</div>
        <div className="menu-items">
          <a href="#" className="menu-item">Profile</a>
          <a href="#" className="menu-item">Leaderboard</a>
          <a href="#" className="menu-item">Quizzes</a>
        </div>
      </div>
      <div className="quiz-container">
        <div className="quiz-content">
          {!quizData ? (
            <div className="quiz-generator">
              <h2>Generate a Quiz</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                rows="10"
              />
              <div className="question-count-selector">
                <label htmlFor="questionCount">Number of questions:</label>
                <select 
                  id="questionCount" 
                  value={numberOfQuestions} 
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <button onClick={handleGenerateQuiz} disabled={isGenerating || !inputText.trim()}>
                {isGenerating ? 'Generating...' : 'Generate Quiz'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          ) : showScore ? (
            <div className="score-section">
              <h2>Quiz Completed!</h2>
              <p>You scored {score} out of {quizData.questions.length}</p>
              <button className="restart-button" onClick={restartQuiz}>New Quiz</button>
            </div>
          ) : (
            <>
              <h2 className="quiz-title">{quizData.title}</h2>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{quizData.questions.length}
                </div>
                <div className="question-text">{quizData.questions[currentQuestion].questionText}</div>
              </div>
              <div className="answer-section">
                {quizData.questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswerClick(answerOption.isCorrect)}
                    disabled={answered}
                    className={answered && answerOption.isCorrect ? 'correct-answer' : ''}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
              {feedback && (
                <div className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
                  {feedback}
                </div>
              )}
              {showNextButton && (
                <button 
                  className="next-button" 
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === quizData.questions.length - 1 ? 'See Results' : 'Next Question'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;