import * as uuid from 'uuid';
//import AWS from 'aws-sdk';
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

//aws-sdk permite utilizar vários serviços da AWS
//const dynamoDb = new AWS.DynamoDB.DocumentClient();

//Código refatorado
export const main = handler(async(event) => {//corpo da solicitação HTTP
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;

});


  /* try {
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
  }*/