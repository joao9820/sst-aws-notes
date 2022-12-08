export function calculateCost(storage){
  /*O valor retornado é em dolar, multiplicamos por 100
  por que o stripe espera que forneçamos o valor em centavos*/
  const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
  return rate * storage * 100;
}