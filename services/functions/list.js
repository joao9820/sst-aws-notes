import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params);

  // Return the retrieved item
  return result.Items;
});