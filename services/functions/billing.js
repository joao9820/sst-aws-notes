import Stripe from 'stripe';
import handler from '../util/handler';
import { calculateCost } from '../util/cost';

export const main = handler(async (event) => {

  //storage é o número o número de notas que o usuário quer armazenar na sua conta
  //source é o token Stripe do cartão que será cobrado
  const {storage, source} = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  //Carrega nossa secret key das variáveis de ambiente
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currence: "usd",
  });

  return {status: true};

});