import boto3
import json
import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Mood')

    # Extract userId and startDate from the event
    userId = event['userId']
    startDate = event['startDate']

    # Convert startDate to datetime object
    startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')

    # Query the table for moods starting from startDate
    response = table.query(
        KeyConditionExpression='#userId = :userId AND #day >= :startDate',
        ExpressionAttributeNames={
            '#userId': 'userId',
            '#day': 'day'
        },
        ExpressionAttributeValues={
            ':userId': userId,
            ':startDate': startDate.strftime('%Y-%m-%d')
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'moods': response['Items']})
    }