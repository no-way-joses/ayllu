import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Family')
    
    # Extract familyId from the event
    familyId = event['familyId']

    # Get the family item from DynamoDB table
    response = table.get_item(
        Key={
            'familyId': familyId
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'family': response['Item']})
    }