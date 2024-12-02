import { useState } from "react"
import { Header } from ".."
import Head from "next/head"
import { Spinner,Alert } from "../comps/comps"
import { validateEmail } from "./register"
export default function EnterWithLink(){

    const [email,setEmail] = useState('')
    const [text,setText] = useState("Use o formulário abaixo para enviar link de autenticação no seu email.")
    const [type_alert,setTypeAlert] = useState("primary")
    const [visible,setVisible] = useState(false)

    function sendEmail(){

        var status = false;
        var error = "Usuário não Encontrado."


        setVisible(true)

        if(!validateEmail(email)){
            setText('Email Inválido.')
            setTypeAlert('danger')
        }else{

            if(status == true){
                setText(`Foi enviado um  link de autenticação  para ${email}`)
                setTypeAlert('success')
            }else{
                setText(error)
                setTypeAlert('danger')
            }
        }



        //setVisible(false)

    }




    return(
        <div>
            <Head>
               <title>Entrar com Link de Email</title>
            </Head>

            <Header />

            <Alert text={text} type={type_alert}/>

            <Spinner visible={visible} />

            <h3 style={{textAlign:'center',marginTop:"3%"}}>Entrar com Link de Email</h3>

            <form id="form" >
                <input type="text" placeholder="E-mail" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <button className="btn btn-primary" type="button" onClick={sendEmail}>Enviar Email</button>
            </form>

        </div>
    )


}