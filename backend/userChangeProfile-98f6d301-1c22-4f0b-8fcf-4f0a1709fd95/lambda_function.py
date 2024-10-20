import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table_name = 'User'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    user_id = event.get('userId')
    profile = event.get('profile')

    # Validate input
    if not user_id or not profile:
        return {
            'statusCode': 400,
            'body': json.dumps('userId and profile are required')
        }

    try:
        # Update the item in the DynamoDB table
        response = table.update_item(
            Key={'userId': user_id},  # Adjust the key according to your table schema
            UpdateExpression="set #n = :profile",
            ExpressionAttributeNames={"#n": "profile"},
            ExpressionAttributeValues={":profile": profile},
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

