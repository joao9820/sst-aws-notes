import {Template} from "aws-cdk-lib/assertions";
import {App,  getStack} from "@serverless-stack/resources";
import {StorageStack} from "../StorageStack";
import {test} from "vitest";

test("Test StorageStack", () => {

  /* O teste verifica se a stack de armazenamento cria uma tabela do DynamoDB e se o modo
  de cobrança da tabela está definido como PAY_PER_REQUEST que é a configuração padrão
  na construção do SST Table, o teste garante que a configuração padrãoo não foi alterada por engano */

  const app = new App();
  //WHEN
  app.stack(StorageStack);
  //THEN
  const template = Template.fromStack(getStack(StorageStack));

  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
  });


});
