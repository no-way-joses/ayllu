import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('User')

    userId = event['userId']

    # Get the user item from DynamoDB table
    response = table.get_item(
        Key={
            'userId': userId
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'response': response})
    }