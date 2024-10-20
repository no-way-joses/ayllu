import boto3
import json
import datetime

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Plans')

    # Extract familyId and startDate from the event
    familyId = event['familyId']
    startDate = event['startDate']

    # Convert startDate to datetime object
    startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')

    # Query the table for plans of the family starting from startDate
    response = table.query(
        KeyConditionExpression='#familyId = :familyId AND #startDate >= :startDate',
        ExpressionAttributeNames={
            '#familyId': 'familyId',
            '#startDate': 'startDate'
        },
        ExpressionAttributeValues={
            ':familyId': familyId,
            ':startDate': startDate.strftime('%Y-%m-%d')
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'plans': response['Items']})
    }