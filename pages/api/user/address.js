import { AuthenticateUser } from "../../../Auth/auth"
import { User } from "../../../MongoDB/users"


export default async function handler(req,res){


    const response = {}
    
    try{

        const token = req.headers['authorization']
        const user_authenticated = new AuthenticateUser()
        const user_instance = new User()
        await user_instance.startClient()
        const user_data =  user_authenticated.DecryptToken(token)

        if(req.method == "GET"){
            let user = await user_instance.findUserById(user_data['_id'])
            response['address'] = user['address']
        }

        if(req.method == "POST"){
            const address = req.body
            await user_instance.updateUser(user_data['_id'],{address:address})
        }

        response['status'] = 'ok'

    }catch(e){
        response['status'] = 'error'

    }

    res.json(response)


}