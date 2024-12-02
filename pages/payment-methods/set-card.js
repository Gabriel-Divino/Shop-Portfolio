import { useEffect, useState } from "react"
import { Spinner } from "../comps/comps"
import { GetToken } from "../user/login"


export default function SetCard(){

    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        setVisible(true)
        fetch('/api/stripe/set-card',{
            method:"GET",
            headers:{
                "Authorization":GetToken(),
                "Content-Type": "application/json",
            }
        }).then(response=>response.json())
        .then(response=>{
            if(response['status'] == 'ok'){
                
            }else{
            }
            setVisible(false)
            window.location.href = "/"
            
        })
       
    })


    return(
        <div>
            <Spinner visible={visible} />
        </div>
    )


}