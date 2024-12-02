import Head from "next/head"
import { Header } from ".."
import { useState } from "react";
import Link from "next/link";
import { Spinner,Alert } from "../comps/comps";


function Passou30Dias(){

  const token_time = localStorage.getItem('token-time')
  let data_atual = new Date()
  let data_token= new Date(token_time)
  let diferença = data_atual - data_token
  const dias =  Math.ceil(diferença / (24 * 60 * 60 * 1000))

  if(dias >= 30 ){
      localStorage.clear()
      window.alert("Seu Login Expirou !")
      window.location = "/user/login"

  }


}



export  function GetToken(){


  Passou30Dias()
  return localStorage.getItem('token')

}


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [text,setText] = useState("Use o formulário abaixo para fazer login")
    const [type_alert,setTypeAlert] = useState("primary")
    const [visible,setVisible] = useState(false)
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);

        let status = false
        let error = "Email e Senha não coicidem."
        setVisible(true)

        let form = {
          'email':email,
          'password':password
        }

        setVisible(true)
        fetch('/api/user/login',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(form)
        }).then(response=>response.json())
        .then(response=>{
          console.log(response)
          if(response['status'] == 'ok'){
            setText("Login Efetuado com Sucesso !")
            setTypeAlert('success')
            localStorage.setItem('token',response['token'])
            localStorage.setItem('token-time',new Date().toISOString())
            localStorage.setItem('user',email)
            window.location = "/"
        }else{
            setText(response['error'])
            setTypeAlert('danger')
        }
        setVisible(false)
        })



      };

    return(
        <div>
            <Head>
                <title>Shop - Entrar</title>
            </Head>

            <Header />

            <Alert text={text} type={type_alert}/>

            <Spinner visible={visible} />



    <form onSubmit={handleSubmit} id="form">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

        <Link href={'/user/register'}>Não Possui uma Conta ? Registre-se Aqui !</Link> | <Link href={'/user/forgot-password'}>Esqueceu sua Senha ?</Link>
        | <Link href={'/user/enter-with-link'}>Entrar com Link de E-mail</Link>
        <br/>
        <br/>
        
      <button type="submit" className="btn btn-primary">Entrar</button>
    </form>

        </div>
    )


}