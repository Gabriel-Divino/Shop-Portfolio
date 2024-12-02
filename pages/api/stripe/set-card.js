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

        const card_id = await stripe.getCardId(user['stripe']['customerId'])

        let stripe_data  = user['stripe']
        stripe_data['cardId'] = card_id

        await user_instance.updateUser(String(user['_id']),{stripe:stripe_data})

        response['status'] = 'ok'

    }catch(e){
        console.log(e)
        response['status'] = 'error'

    }


    res.json(response)

}