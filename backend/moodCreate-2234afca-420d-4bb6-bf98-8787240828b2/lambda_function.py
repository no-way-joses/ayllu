import boto3
import json
import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Mood')

    # Extract userId and result from the event
    userId = event['userId']
    result = event['result']

    # Get current timestamp
    current_date = datetime.date.today().strftime('%Y-%m-%d')

    # Put item into DynamoDB table
    response = table.put_item(
        Item={
            'userId': userId,
            'result': result,
            'day': current_date
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }