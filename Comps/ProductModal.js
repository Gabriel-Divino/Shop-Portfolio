import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner } from '../pages/comps/comps';
import { GetToken } from '../pages/user/login';

export default function ProductModal(){


    const [product,setProduct] = useState({})
    const [number,setNumber] = useState(0)
    const [images,setImages] = useState([])
    const [amount,setAmount] = useState(0)
    const [visible,setVisible] = useState(false)


    function init(){

        document.getElementById('login_error').style.display = 'none'
        document.getElementById('stock_error').style.display = 'none'
        document.getElementById('address_error').style.display = 'none'
        document.getElementById('purchase_error').style.display = 'none'
        document.getElementById('purchase_success').style.display = 'none'

    }


    useEffect(()=>{

        if(number > 0){
            init()
            const p = localStorage.getItem('produto')
            if(p != null){
                const  _product = JSON.parse(p)
                setProduct(_product)
                setImages(_product['images'])
                setAmount(_product['price'])
                document.getElementById('amount_value').innerText = _product['price']
            }
        }

    },[number])

    function changeAmount(){

        let _amount = document.getElementById('amount').value
        let total = Number(_amount) * Number(product['price'])
        document.getElementById('amount_value').innerText = total

    }

    const click = () =>{
        let n = number
        n+=1
        setNumber(n)
    }

    const Carousel = () =>{

        const Images = () =>{
            let imgs = []
            for(let i = 1;i<=images.length-1;i++){
                    imgs.push(
                        <div class="carousel-item"> 
                        <img src={images[i]}   id='carousel_img'/>
                        </div> 
                    )
            }

            return imgs
        }

        return(
        <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">

            <div class="carousel-item active">
            <img src={images[0]}  id='carousel_img' />
            </div>
            
            <Images />

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <i class="bi bi-arrow-left-circle-fill" style={{color:"black",fontSize:"300%"}}></i>
            <span class="visually-hidden" >Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <i class="bi bi-arrow-right-circle-fill" style={{color:"black",fontSize:"300%"}}></i>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
        )
    }

    const Description  = () =>{

        return(
            <div style={{marginTop:"5%"}}>
            <p class="d-inline-flex gap-1">
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Descrição do Produto
            </a>
            </p>
            <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <p style={{fontSize:"120%",textAlign:"justify"}}>
                {product.description}
                </p>
            </div>
            </div>
            </div>
        )

    }

    const Amount = () =>{

        const values = []

        for(let i = 1;i<=product.stock;i++){
            values.push(
                <option value={String(i)}>{i}</option>  
            )
        }

        return(
            <div style={{marginTop:"3%"}}>
                <p>
                    Quantidade :
                    <select class="form-select" id='amount' onChange={changeAmount}>
                        
                        {values}
                    </select>
                </p>
            </div>
        )
    }

    function buy_product(){

        let user = localStorage.getItem('user')
        if(user != null){

            let doc = {
                "product_id":product['_id'],
                "amount":document.getElementById('amount').value,
            }

            console.log(doc)

            setVisible(true)

            fetch('/api/purchase/product',{
                method:"POST",
                headers:{
                    'Authorization':GetToken(),
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(doc)
            }).then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response['status'] == 'ok'){
                    document.getElementById('purchase_success').style.display = 'block'
                }
                else{
                    switch(response['error']){
                        case "Not Address":
                            document.getElementById('address_error').style.display = 'block'
                            break;
                        
                        case "Not Payment Method":
                            document.getElementById('purchase_error').style.display = 'block'
                            break;
                        
                        case "Stock Error":
                            document.getElementById('stock_error').style.display = 'block'
                            break;

                    }
                }

                setVisible(false)
            })

        }else{
            document.getElementById('login_error').style.display = 'block'
        }  

    }


    return(
        <div id="product_accessed">

        <div  data-bs-toggle="modal" data-bs-target="#ProductModal" id='click_modal' onClick={click}>
            
        </div>

        <div class="modal fade" id="ProductModal" tabindex="-1" aria-labelledby="ProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="ProductModalLabel">{product.name}</h1>
                <p style={{marginLeft:"5%",marginTop:"2%"}}><a href={`/product/${product._id}`} target='blank'>Acessar Produto</a></p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <Carousel />
                <h1 class="modal-title fs-5" id="ProductModalLabel" style={{marginTop:"1.25%"}}>{product.name}</h1>
                <h1 class="modal-title fs-5" id="ProductModalLabel" style={{color:"darkcyan",fontWeight:"bolder"}}>R${product.price}</h1>

                <Amount />
                <h1 class="modal-title fs-5" id="ProductModalLabel" style={{color:"darkcyan",fontWeight:"bolder"}}>
                    Total - R$<label id='amount_value'></label>
                </h1>

        
               
               <p  id='login_error'>
               <small  className='message_error'>Você Precisa Fazer Login Para Comprar !</small> - 
                <a onClick={()=>{window.location.href = "/user/login"}} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Fazer Login</a>
              </p>

              <p  id='stock_error'>
               <small  className='message_error'>Quantidade Não Disponivel</small>
              </p>

              <p  id='address_error'>
                <small  className='message_error'> Você Precisa Registrar seu Endereço para Entregas</small> - 
                <a onClick={()=>{window.location.href = "/user/address"}} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Registrar Endereço</a>
              </p>

              <p  id='purchase_error'>
                <small  className='message_error'>Você Precisa Registrar Uma Forma de Pagamento</small> - 
                <a onClick={()=>{window.location.href = "/payment-methods/methods"}} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Registrar Forma de Pagamento</a>
              </p>

              <p  id='purchase_success'>
                <small  className='message_success'>Sua Compra foi Realizada com Sucesso.</small>
            
              </p>

                <Spinner visible={visible} />

                <Description />


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" onClick={buy_product}>Comprar</button>
                <button type="button" class="btn btn-dark">
                  Adicionar ao Carrinho  <i class="bi bi-cart" style={{fontSize:"120%"}}></i>
                </button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )

}