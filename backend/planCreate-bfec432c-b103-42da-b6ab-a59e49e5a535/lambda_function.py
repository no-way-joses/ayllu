import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Plans')

    # Extract input data from the event
    familyId = event['familyId']
    startDate = event['startDate']
    title = event['title']

    # Create the plan item
    planItem = {
        'familyId': familyId,
        'startDate': startDate,
        'title': title
    }

    # Remove optional fields if not provided
    if 'startHour' in event:
        planItem['startHour'] = event.get('startHour')
    if 'endDate' in event:
        planItem['endDate'] = event.get('endDate')
    if 'endHour' in event:
        planItem['endHour'] = event.get('endHour')
    if 'description' in event:
        planItem['description'] = event.get('description')

    # Put the plan item into the table
    response = table.put_item(
        Item=planItem
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'response': response})
    }