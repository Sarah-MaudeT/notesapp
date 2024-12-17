# QuizTime: AI-Powered Quiz Generator

QuizTime is an interactive web application that generates custom quizzes using AI based on user-provided text.

## How It Works

1. Users enter text and select the number of questions.
2. The app sends this input to an AWS Lambda function via API Gateway.
3. The Lambda function uses Amazon Bedrock (Claude 3 Sonnet model) to generate quiz questions.
4. The generated quiz is sent back to the frontend and presented to the user.
5. Users answer questions and receive immediate feedback.
6. After completing the quiz, users see their final score.

## What's Included

- `src/App.jsx`: Main React component for the user interface.
- `src/App.css`: Styling for the application.
- `src/quizGenerator.js`: Handles API communication with the backend.
- `Lambdas/quiz_generator.py`: AWS Lambda function for quiz generation.

## Setup

1. Deploy the Lambda function:
   - Create a new Lambda function in AWS.
   - Copy the code from `Lambdas/quiz_generator.py` into the function.
   - Set the runtime to Python 3.13.
   - Ensure the function has permissions to access Amazon Bedrock.

2. Create an API Gateway:
   - Set up a new REST API in API Gateway.
   - Create a POST method and integrate it with your Lambda function.
   - Enable CORS for the API:
     - Go to Actions > Enable CORS
     - For Access-Control-Allow-Origin, enter '*' (or your specific domain for production)
     - Select the POST method
     - Click "Enable CORS and replace existing CORS headers"
   - Deploy the API and note the invoke URL.

3. Update `src/quizGenerator.js`:
   - Replace the `API_ENDPOINT` with your API Gateway invoke URL:
     ```javascript
     const API_ENDPOINT = 'your API Gateway invoke URL';
     ```

4. Install dependencies and run the React app:
   - npm install
   - npm run dev

## Note

Ensure you have the necessary AWS permissions and Bedrock model access before deploying.

## Useful Links

- [Build a React Application with AWS Amplify](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/)