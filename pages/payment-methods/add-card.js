import { Header } from ".."
import Head from "next/head"
import { loadStripe } from "@stripe/stripe-js";
import { Elements,PaymentElement,useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Spinner } from "../comps/comps";
import { GetToken } from "../user/login";

const SetupForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const {error} = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `https://shop-delta-dusky.vercel.app/payment-methods/set-card`,
        }
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (e.g., payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} id="setupform" style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <PaymentElement />
        </div>
        <button type="submit" disabled={!stripe} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Salvar
        </button>
        {errorMessage && <div style={{ marginTop: '10px', color: 'red' }}>{errorMessage}</div>}
      </form>
    </div>
    )
  };

export default function AddCard(){
    
    const public_key = "pk_test_51PQZji06yrLLPldCWN7vw7racwTaT7N35GFhYBoKzl6IHcf52FuTLmC931KdKXqkVI7Ga7QfnOwe6mn0CUJwl4G100Z4FqnpuH" 
    const stripePromise = loadStripe(public_key);
    const [clientSecret, setClientSecret] = useState("");
    const [visible,setVisible] = useState(false)

    useEffect(()=>{

           setVisible(true)
            fetch('/api/stripe/create-setup-intent',{
                method:"GET",
                headers:{
                    "Authorization":GetToken(),
                    "Content-Type": "application/json",      
                },
            }).then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response['status'] == 'ok'){
                    setClientSecret(response['client_secret'])
                }
                setVisible(false)
            })

    },[])

    const appearance = {
      theme: 'stripe',
    };

  const options = {
      clientSecret,
      appearance,
    };


    return(
        <div>
            <Head>
                <title>Adicionar Cartão de Crédito</title>
            </Head>

            <Header />

            <div style={{marginTop:"5%"}}>
            <Spinner visible={visible} />
            </div>

            <div>

            {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <h1 style={{"textAlign":"center","marginBottom":"5%"}}>Adicionar Cartão</h1>
                <SetupForm   />
            </Elements>
        )}
            </div>


        </div>
    )


}