import {Table, Bucket} from '@serverless-stack/resources';
/* Stack responsável pelo armazenamento DynamoDB e S3 */
export function StorageStack({stack, app}){

  //Criando Bucket s3
  const bucket = new Bucket(stack, "Uploads");
  //Criando tabela Notes
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: {partitionKey: "userId", sortKey: "noteId"}
  });

  //Dessa forma conseguiremos referenciar os itens nas outras stacks
  return {
    table,
    bucket
  }

}