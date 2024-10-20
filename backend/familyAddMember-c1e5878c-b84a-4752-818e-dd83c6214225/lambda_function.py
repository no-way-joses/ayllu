import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Family')

    # Extract familyId and userId from the event
    familyId = event['familyId']
    userId = event['userId']

    # Update the item in DynamoDB table to add the member
    response = table.update_item(
        Key={
            'familyId': familyId
        },
        UpdateExpression="set members = list_append(members, :new_member)",
        ExpressionAttributeValues={
            ':new_member': [userId]
        },
        ReturnValues="UPDATED_NEW"
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'familyId': familyId, 'response': response})
    }