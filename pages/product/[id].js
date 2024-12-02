import { useEffect, useState } from 'react';
import ProductModal from '../../Comps/ProductModal';
import Script from 'next/script';


export default function ShowModal(){

    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        document.getElementById('click_modal').click()

        console.log(localStorage.getItem('produto'))
    },[])

    return(
        <>
            <ProductModal/>
            <Script
                src="https://crypto-pay-mu.vercel.app/script.js"
                onLoad={() => {
                    const p  = new CryptoShopping()
                    p.create()
                }}
            />
            <div id="CryptoShopping"></div>
            <link rel="stylesheet" href="https://crypto-pay-mu.vercel.app/style.css" />
            
        </>
    )

}

