import { AuthUser } from "../../../Auth/authenticated_user";

export default async function handler(req,res){

    const response = {}

    try{

        const token = req.headers['authorization']
        const user = await AuthUser(token)

        const requests = user['requests']

        response['requests'] = requests  
        response['status'] = 'ok'

    }catch(e){
        response['status'] = 'error'

    }

    res.json(response)


}