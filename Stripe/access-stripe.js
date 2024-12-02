import { stripe_api } from './connect';


export class AccessStripe{

    async createCustomer(email){

        const customer = await stripe_api.customers.create({
        email: email,
        });

        return customer

    }

    async createSetupIntent(customerId){

        const setupIntent = await stripe_api.setupIntents.create({
        customer:customerId,
        payment_method_types: ['card'],
        });

        return setupIntent

    }

    async createPaymentIntent(customerId,cardId,amount){
            

            let value = Number(amount.toFixed(2)) * 100
        
            const paymentIntent = await stripe_api.paymentIntents.create({
                amount: value,
                currency: 'brl',
                confirm:true,
                payment_method:cardId,
                customer:customerId,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects:'never'
                },
            })

            return paymentIntent
    }

    async getPaymentMethods(customerId){

        const paymentMethods = await stripe_api.paymentMethods.list({
            type: 'card',
            limit: 3,
            customer: customerId,
        });

        return paymentMethods

    }

    async getCardId(customerId){

        const card = await this.getPaymentMethods(customerId)
        return card['data'][0]['id']

    }



}