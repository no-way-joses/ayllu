import boto3
import json
import uuid

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('User')

    # Extract name and userId from the event
    name = event['name']
    userId = event['userId']

    # Check if user exists
    response = table.get_item(
        Key={
            'userId': userId
        }
    )

    if 'Item' in response:
        # User exists, return the user data
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item'])
        }

    # User does not exist, create new item
    response = table.put_item(
        Item={
            'userId': userId,
            'name': name,
            'profile': "0",
            'familyId': "0"
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({
            'userId': userId,
            'name': name,
            'profile': "0",
            'familyId': "0"
        })
    }