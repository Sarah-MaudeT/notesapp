import json
import boto3
import botocore

# Initialize the Bedrock client
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name='ca-central-1'  
)

def lambda_handler(event, context):
    try:
        # Parse the incoming JSON body
        body = json.loads(event['body'])
        input_text = body['inputText']
        # Get the number of questions, default to 4 if not provided
        number_of_questions = body.get('numberOfQuestions', 4)  # Default to 4 if not provided

        # Construct the prompt for the AI model
        prompt = f"""Generate a quiz with {number_of_questions} multiple-choice questions based on the following text. Format the output as a JSON object with a 'title' field and a 'questions' array. Each question should have a 'questionText' field and an 'answerOptions' array with 4 options, where each option has 'answerText' and 'isCorrect' fields. Ensure only one option is correct for each question.

Text: {input_text}

Output the quiz in the following format:
{{
  "title": "Quiz Title",
  "questions": [
    {{
      "questionText": "Question 1",
      "answerOptions": [
        {{ "answerText": "Option 1", "isCorrect": false }},
        {{ "answerText": "Option 2", "isCorrect": true }},
        {{ "answerText": "Option 3", "isCorrect": false }},
        {{ "answerText": "Option 4", "isCorrect": false }}
      ]
    }},
    // ... more questions ...
  ]
}}"""

        # Prepare the request payload for the Bedrock model
        request_payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "temperature": 0.5,
            "top_p": 0.9,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }

        # Invoke the Bedrock model (Claude 3 Sonnet)
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps(request_payload)
        )

        # Parse the response from the model
        response_body = json.loads(response['body'].read())
        quiz = json.loads(response_body['content'][0]['text'])

        # Return the generated quiz with appropriate headers
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Allow all origins for CORS (adjust for production)
            },
            'body': json.dumps(quiz)
        }

    except botocore.exceptions.ClientError as error:
        # Handle Bedrock-specific errors
        return {
            'statusCode': error.response['ResponseMetadata']['HTTPStatusCode'],
            'body': json.dumps({'error': str(error)}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Allow all origins for CORS (adjust for production)
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Allow all origins for CORS (adjust for production)
            }
        }