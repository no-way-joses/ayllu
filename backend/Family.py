import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = 'Family'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    family_id = event.get('familyId')
    name = event.get('name')

    # Validate input
    if not family_id or not name:
        return {
            'statusCode': 400,
            'body': json.dumps('familyId and name are required')
        }

    try:
        # Update the item in the DynamoDB table
        response = table.update_item(
            Key={'familyId': family_id},  # Adjust the key according to your table schema
            UpdateExpression="set #n = :name",
            ExpressionAttributeNames={"#n": "name"},
            ExpressionAttributeValues={":name": name},
            ReturnValues="UPDATED_NEW"
        )

        # Return the updated attributes
        return {
            'statusCode': 200,
            'body': json.dumps(response['Attributes'])
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error updating item: {e.response['Error']['Message']}")
        }