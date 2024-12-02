import { AuthenticateUser } from "./auth";
import { User } from "../MongoDB/users";

export async function AuthUser(token){

    const authenticated_user = new AuthenticateUser()
    const user_data = authenticated_user.DecryptToken(token)
    const user_instance = new User()
    await user_instance.startClient()
    const user = await  user_instance.findUserById(user_data['_id'])

    return user
}
