import { Header } from "..";
import Head from "next/head";
import Link from "next/link";



export default function Methods(){

    
    return(
        <div>
            <Head>
                <title>Formas de Pagamento</title>
            </Head>

            <Header />

            <h1 style={{textAlign:"center",marginTop:"5%"}}>
                Selecione um Metodo de Pagamento
            </h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:"5%", flexDirection: 'column' }}>
            <Link href={"/payment-methods/add-card"} type="button" className="btn btn-primary btn-lg" style={{ marginBottom: '10px'}}>Adicionar Cartão de Crédito</Link>
            <button type="button" className="btn btn-dark btn-lg" style={{marginTop:"1.5%"}}>
                <img style={{ width: '25px', marginRight: '8px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png" alt="MetaMask" />
                Pagar com Carteira MetaMask 
            </button>
            </div>


        </div>
    )


}