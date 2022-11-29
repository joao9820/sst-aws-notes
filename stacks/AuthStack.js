import * as iam from "aws-cdk-lib/aws-iam";
import {Cognito, use} from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import {ApiStack} from "./ApiStack";

export function AuthStack({stack, app}) {

  const {bucket} = use(StorageStack);
  const {api} = use(ApiStack);

    // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    //Permite accessar a api
    api,
    //Policy garantindo acesso ao diretório específico no bucket
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${coginito-indentity.amazonaws.com:sub}/*"
      ],
    }),
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  //Retorna o recurso auth
  return {
    auth,
  }

}