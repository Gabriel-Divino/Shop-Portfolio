import { useState } from "react"
import { Header } from ".."
import Head from "next/head"
import { Spinner, Alert } from "../comps/comps"
import { validateEmail } from "./register"


export default function ForgotPassword(){

    const [email,setEmail] = useState(null)
    const [text,setText] = useState("Use o Formulário Abaixo Para Enviar um Email de Redefinição de Senha.")
    const [type_alert,setTypeAlert] = useState("primary")
    const [visible,setVisible] = useState(false)

    function sendEmail(){


        var status = true;
        var error = "Usuário não Encontrado."


        setVisible(true)

        if(!validateEmail(email)){
            setText('Email Inválido.')
            setTypeAlert('danger')
        }else{

            if(status == true){
                setText(`Foi enviado um  link de redefinição de senha para ${email}`)
                setTypeAlert('success')
            }else{
                setText(error)
                setTypeAlert('danger')
            }
        }



        setVisible(false)




    }


    return(
        <div>
            <Head>
               <title>Redefinição de Senha</title>
            </Head>

            <Header />

            <Alert text={text} type={type_alert}/>

            <Spinner visible={visible} />
           

            <h3 style={{textAlign:'center',marginTop:"3%"}}>Redefinição de Senha</h3>

            <form id="form" >
                <input type="text" placeholder="E-mail" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <button className="btn btn-primary" type="button" onClick={sendEmail}>Enviar Email para Recuperar Senha</button>
            </form>

        </div>
    )


}