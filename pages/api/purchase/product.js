import { User } from "../../../MongoDB/users"
import { Products } from "../../../MongoDB/products"
import { AccessStripe } from "../../../Stripe/access-stripe"
import { AuthUser } from "../../../Auth/authenticated_user"


export default async function handler(req,res){

    const response = {}


    try{

        const token = req.headers['authorization']
        const user = await  AuthUser(token)
        const body = req.body
        console.log(body)
        const user_instance = new User()
        await user_instance.startClient()


        if(user['address'] == null) throw "Not Address"

        let stripe_data = {}
        
        if(user['stripe'] != null){
            stripe_data = user['stripe']
        }
        
        if(stripe_data['cardId'] == null) throw "Not Payment Method"

        const product_instance = new Products()
        await product_instance.startClient()

        const product = await product_instance.getProductById(body['product_id'])
        console.log(product)
        if(product['stock'] <= 0  || product['stock'] < Number(body['amount'])) throw "Stock Error"

        const stripe = new AccessStripe()

        const value = Number(body['amount']) * product['price']
        const purchase = await stripe.createPaymentIntent(stripe_data['customerId'],stripe_data['cardId'],value) //

        const new_stock = product['stock'] - Number(body['amount'])

        await product_instance.updateProduct(body['product_id'],{stock:new_stock})

        delete product['tags']
        delete product['description']

        const request = {

            purchase_id:purchase['id'],
            purchase_value:value,
            products: [product],
            amount:Number(body['amount']),
            date:new Date(),
            form_of_payment : "Cartão de Crédito"

        }

        let requests = []

        if(user['requests'] != null){
            requests = user['requests']
        }

        requests.push(request)

        await user_instance.updateUser(String(user['_id']),{'requests':requests})


        response['status'] = 'ok'

    }catch(e){
        console.log(e)
        response['error'] = e
        response['status'] = 'error'
    }


    res.json(response)


}