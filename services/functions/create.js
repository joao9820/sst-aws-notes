import * as uuid from 'uuid';
import AWS from 'aws-sdk';

//aws-sdk permite utilizar vários serviços da AWS
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event){

  //corpo da solicitação HTTP
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: '123',
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    }
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

  }catch(e){
    return {
      statusCode: 500,
      body: JSON.stringify({error: e.message}),
    }
  }

}