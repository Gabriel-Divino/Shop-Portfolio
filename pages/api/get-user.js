import { User } from "../../MongoDB/users"


export default async function handler(req,res){


    const response = {}

    try{


        const user = new User();
        await user.startClient();

        const get_user = await user.findUserById(req.query._id);

        response['user'] = get_user
        response['status'] = 'ok'

    }catch(e){
        response['status'] = 'error'
    }

    res.json(response)

}