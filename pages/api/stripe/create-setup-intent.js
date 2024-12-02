import { AuthUser } from "../../../Auth/authenticated_user"
import { User } from "../../../MongoDB/users"
import { AccessStripe } from "../../../Stripe/access-stripe"



export default async function handler(req,res){

    const response = {}

    try{

        const token = req.headers['authorization']
        const user = await AuthUser(token)
        
        const user_instance = new User()
        await user_instance.startClient()

        const stripe = new AccessStripe()

        var client_secret = ""

        if(user['stripe'] != null){

            client_secret = await stripe.createSetupIntent(user['stripe']['customerId'])

        }else{
            const customer = await  stripe.createCustomer(user['email'])
            
            await user_instance.updateUser(String(user['_id']),{
                stripe:{
                    customerId:customer['id']
                }
            })

            client_secret = await stripe.createSetupIntent(customer['id'])
        }


        response['client_secret'] = client_secret['client_secret']
        response['status'] = 'ok'



    }catch(e){
        console.log(e)
        response['status'] = 'error'

    }

    res.json(response)


}