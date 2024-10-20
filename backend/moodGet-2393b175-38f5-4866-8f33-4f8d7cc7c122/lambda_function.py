import boto3
import json
import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Mood')

    # Extract userId from the event
    userId = event['userId']

    # Get today's date in YYYY-MM-DD format
    today = datetime.date.today().strftime('%Y-%m-%d')

    # Query the table for today's result
    response = table.get_item(
        Key={
            'userId': userId,
            'day': today
        }
    )

    # Check if the item was found
    if 'Item' in response:
        result = response['Item']['result']
    else:
        result = 0

    return {
        'statusCode': 200,
        'body': json.dumps({'result': result})
    }