import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('User')
    family_table = dynamodb.Table('Family')

    # Extract userId and familyId from the event
    userId = event['userId']
    familyId = event['familyId']

    # Update the familyId to match the userId
    response = table.update_item(
        Key={
            'userId': userId
        },
        UpdateExpression="set familyId = :newFamilyId",
        ExpressionAttributeValues={
            ':newFamilyId': familyId
        },
        ReturnValues="UPDATED_NEW"
    )
    
    family_response = family_table.update_item(
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
        'body': json.dumps({'response': response, 'family_response': family_response})
    }