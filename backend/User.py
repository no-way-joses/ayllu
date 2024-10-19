import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table_name = 'YourDynamoDBTable'  # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    user_id = event.get('userID')
    name = event.get('name')

    # Validate input
    if not user_id or not name:
        return {
            'statusCode': 400,
            'body': json.dumps('userID and name are required')
        }

    try:
        # Update the item in the DynamoDB table
        response = table.update_item(
            Key={'userID': user_id},  # Adjust the key according to your table schema
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
