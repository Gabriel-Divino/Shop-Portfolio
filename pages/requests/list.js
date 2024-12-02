import React, { useEffect, useState } from 'react';
import { Header } from '..';
import { Spinner } from '../comps/comps';
import { GetToken } from '../user/login';
import Head from 'next/head';

const Purchase = ({ purchase }) => {
    const date = new Date(purchase.date).toLocaleString();
  
    return (
      <div className="purchase">
        <h2>Id da Compra: {purchase.purchase_id}</h2>
        <p style={{color:"darkcyan",fontWeight:"bolder"}}>Valor Total: R${purchase.purchase_value}</p>
        <p style={{color:"black",fontWeight:"bolder"}}>Quantidade: {purchase.amount}</p>
        <p style={{color:"black",fontWeight:"bolder"}}>Data: {date}</p>
        <p style={{color:"black",fontWeight:"bolder"}}>Forma de Pagamento: {purchase.form_of_payment}</p>
        <div className="products">
            <h1 style={{textAlign:"center"}}>Produtos</h1>
          {purchase.products.map((product) => (
            <div key={product._id} className="product">
              <h3>{product.name}</h3>
              <p style={{color:"black",fontWeight:"bolder"}}>Categoria: {product.category}</p>
              <p style={{color:"darkcyan",fontWeight:"bolder"}}>Preço: R${product.price}</p>
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={product.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


export default function List(){

    const [requests,setRequests] = useState([])
    const [visible,setVisible] = useState(false)


    useEffect(()=>{
        setVisible(true)
        fetch('/api/purchase/requests',{
            method:"GET",
            headers:{
                "Authorization":GetToken(),
                "Content-Type": "application/json",      
            },
        })
        .then(response=>response.json())
        .then(response=>{
            if(response['status'] == 'ok'){
                let _requests = response['requests']
                _requests = _requests.reverse()
                setRequests(response['requests'])
            }
            setVisible(false)
        })
    },[])

    return(
        <div>
            <Head>
                <title>Suas Compras</title>
            </Head>
            <Header />

            <div style={{marginTop:"5%"}}>
            <Spinner visible={visible} />
            </div>
           
            <div className="purchase-list">
            {requests.map((purchase) => (
                <Purchase key={purchase.purchase_id} purchase={purchase} />
            ))}
            </div>
            
        </div>
    )



}