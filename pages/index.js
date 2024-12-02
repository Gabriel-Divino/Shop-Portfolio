import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProductModal from '../Comps/ProductModal';
import Router from 'next/router';
import Script from 'next/script';

export function Header(){

    const [is_authenticated,setIsAuthenticated] = useState(false);
    const [user_authenticated,setUserAuthenticated] = useState("")


    useEffect(()=>{
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
      const token = localStorage.getItem('token')
      if(token != null){
        setIsAuthenticated(true);
        const user = localStorage.getItem('user').split('@')[0]
        setUserAuthenticated(user)
      }

    },[])

    const AuthenticatedButton = () =>{

      let sair = () =>{
          localStorage.clear()
          window.location = '/'
      }
      
      return(
        <div class="btn-group" id="authenticatedButton">
          <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Olá ,{user_authenticated}
          </button>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" href={"/user/address"}>Gerenciar Endereço</Link></li>
            <li><Link class="dropdown-item" href={"/requests/list"} >Compras</Link></li>
            <li><Link class="dropdown-item" href={"/payment-methods/methods"} >Formas de Pagamento</Link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" onClick={sair} >Sair</a></li>
          </ul>
        </div>
      )

    }

    const Login = () =>{

        if(is_authenticated == false){
            return <Link href={"/user/login"} id='link_enter'>Entrar</Link>
        }else{
          return <AuthenticatedButton />
        }
    }


    const search = () =>{

      let input = document.getElementById('search').value
      Router.push(`/search/${input}`)
    }

    return(
    <nav class="navbar bg-primary" id='header'>
      <div class="container-fluid">

        
        <Link class="navbar-brand" id='title' href={"/"}>Shop</Link>

        <div class="d-flex" role="search">
          <input class="form-control me-2" id='search' type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-light" type='button' onClick={search}>Search</button>
        </div>

        <Login />


      </div>
    </nav>
    )

}


function Category({category}){



  const [products,setProducts] = useState([])

  useEffect(()=>{

    fetch(`/api/products/pick-by-category?category=${category}`)
    .then(response=>response.json())
    .then(response=>{
      console.log(response)
      if(response['status'] == 'ok'){
        setProducts(response['products'])
      }
    })

  },[])



  function Products(){

    const Product = ({product}) =>{

      let click  = () =>{
          //window.alert("produto acessado !")
          localStorage.setItem('produto',JSON.stringify(product))

          const productCrypto = {
              id:product._id,
              name:product.name,
              price:product.price,
              amount:product.stock,
              wallet:'0x1A403178ceB0FaA0C23aD75739411b3BFF3dd061'

          }

          sessionStorage.setItem('CryptoProduct',JSON.stringify(productCrypto))

          document.getElementById('click_modal').click()
      }

      return(
        <div id='Product'>
            <div className="card"  style={{padding:"2%"}}>
              <img src={product.images[0]} class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{fontSize:"120%",color:"darkcyan",fontWeight:"bolder"}}>R${product.price}</p>
                <div  className="btn btn-primary" onClick={click}>Acessar Produto</div>
              </div>
            </div>
        </div>
      )

    }

    if(products.length > 0){
      return(
        <div id="Products">
            <h2>{category}</h2>
  
            <div id="list" class="row row-cols-1 row-cols-md-3 g-4">
                {products.map((p)=>(
                  <Product product={p} key={p._id}/>
                ))}
            </div>
            
        </div>
      )
    }




  }


  return(

    <Products />
  )

  

}





export default function Home() {



  useEffect(()=>{
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  },[])




  return (
    <div > 
      <Head>
        <title>Shop - Home</title>
      </Head>

      <Header />
    
      <ProductModal />
      <Category  category={"Cooktop"}/>
      <Category  category={"Adegas Climatizadas"}/>
      <Category  category={"Lavadoras e Secadoras"}/>
      
      <Script
                src="https://crypto-pay-mu.vercel.app/script.js"
                onLoad={() => {
                    const p  = new CryptoShopping()
                    p.create()
                }}
            />
            <div id="CryptoShopping"></div>
      <link rel="stylesheet" href="https://crypto-pay-mu.vercel.app/style.css" />
  
    </div>
  )
}
