import {Api, use} from '@serverless-stack/resources';
import  {StorageStack} from './StorageStack';

export function ApiStack({stack, app}){

  const {table} = use(StorageStack);

  //Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        //Permissão para api acessar a table DynamoDB
        permissions: [table],
        environment: {
          //var de ambienete que indentifica o nome da nossa tabela
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      //Adionando rota para criar nota
      "GET /notes": "functions/list.main",
      "GET /notes/{id}": "functions/get.main",
      "POST /notes": "functions/create.main",
    },
  });

  //Mostrar a url da API (endpoint) como uma saída
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  //Retornar o recurso api
  return {
    api,
  };
}