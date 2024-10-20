import boto3
import json
import uuid

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Family')
    table_user = dynamodb.Table('User')

    # Extract name from the event
    name = event['name']
    userId = event['userId']

    # Generate a unique family ID using UUID
    familyId = str(uuid.uuid4())

    # Put item into DynamoDB table
    response = table.put_item(
        Item={
            'familyId': familyId,
            'name': name,
            'members': [userId]
        }
    )

    user_response = table_user.update_item(
        Key={
            'userId': userId
        },
        UpdateExpression="set familyId = :newFamilyId",
        ExpressionAttributeValues={
            ':newFamilyId': familyId
        },
        ReturnValues="UPDATED_NEW"
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({'familyId': familyId, 'response': response, 'user_response': user_response})
    }