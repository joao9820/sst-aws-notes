/* É importante notar que o handler.jsarquivo precisa ser importado antes de importarmos qualquer outra coisa . 
Isso ocorre porque adicionaremos algum tratamento de erro a ele posteriormente, que precisa ser inicializado quando nossa função Lambda 
for invocada pela primeira vez. */

export default function handle(lambda){

  return async function (event, context){
    let body, statusCode;

    try {
      //Executa a lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      console.error(e);
      body = {error: e.message };
      statusCode = 500;
    }


    return {
      statusCode,
      body: JSON.stringify(body),
    }


  }

}