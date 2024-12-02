const jwt = require('jsonwebtoken');

export class AuthenticateUser{

    constructor(){
        this.secret_key = "1e11eaecae4f84e2f9d4c4fb6c71337367278241e5ffaf4f1acea1f03477"
    }

    CreateToken(user,_id){

        const token = jwt.sign({ user,_id }, this.secret_key , { expiresIn: '30d' });
        return token;
    };

    DecryptToken(token){
        try {
          const decodedToken = jwt.verify(token, this.secret_key);
          return decodedToken;
        } catch (error) {
          console.error('Erro ao verificar o token de autenticação:', error.message);
          return null;
        }
      }

}