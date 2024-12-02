import { User } from "../../../MongoDB/users"
import { EncryptUserPassword } from "../../../Password/password"
import { AuthenticateUser } from "../../../Auth/auth"

export default async function handler(req,res){

    var response = {}

    try{

        if(req.method == "POST"){

            const email = req.body.email.trim()
            const password = req.body.password

            const user_instance = new User()
            await user_instance.startClient()

            const get_user = await user_instance.findUserByEmail(email)
            
            //Verifica se Usuário já existe
            if(get_user == null){

                const encrypt_password = new EncryptUserPassword()
                
                const document = {
                    'email':email,
                    'password':encrypt_password.encryptData(password) //Criptografa a Senha
                }

                const registered_user  = await user_instance.createUser(document)
                console.log(registered_user)
                if(registered_user['acknowledged'] == true){
                    const authenticate_user = new AuthenticateUser()
                    const token = authenticate_user.CreateToken(email,registered_user['insertedId'].toString())
                    response['token'] = token
                }

                response['status'] = 'ok'
                

            }else{
                throw "Usuário já cadastrado"
            }


        }


    }catch(e){
        console.log(e)
        response['error'] = e
        response['status'] = 'error'
    }

    res.json(response)


}