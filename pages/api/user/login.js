import { User } from "../../../MongoDB/users"
import { EncryptUserPassword } from "../../../Password/password"
import { AuthenticateUser } from "../../../Auth/auth"

export default async function handler(req,res){

    const response = {}


    try{

        if(req.method == "POST"){
            const email = req.body.email.trim()
            var password = req.body.password

            const user_instance = new User()
            await user_instance.startClient()

            const user = await user_instance.findUserByEmail(email)
            if(user['block'] == true){
                throw "Sua Conta foi Bloqueada pelo Número de tentativas , faça uma recuperação por E-mail."
            }

            const password_instance = new EncryptUserPassword()

            const user_password = password_instance.DecryptData(user['password'])

            if(user_password == password){

                const user_authenticated = new AuthenticateUser()
                const token = user_authenticated.CreateToken(user['email'],user['_id'].toString())
                response['token'] = token
                response['status'] = 'ok'

                await user_instance.RemoveFields(user['_id'].toString(),{block:"",login_attempts:""})

            }else{

                let document = {
  
                }


                var login_attempts = user['login_attempts']
                if(login_attempts == null){
                    login_attempts = 1
                }else{
                    login_attempts+=1
                }

                if(login_attempts >= 4){
                    document['block'] = true
                }

                document['login_attempts'] = login_attempts

                await user_instance.updateUser(user['_id'].toString(),document)

                throw "Suas Informações de E-mail e Senha Não Correspondem :(";


            }
             

            
        }   

    }catch(e){
        response['error'] = e
        response['status'] = 'error'
    }

    res.json(response)

}