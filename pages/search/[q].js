import { useEffect, useState } from "react";
import { Header } from "..";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductModal from "../../Comps/ProductModal";

export default function Search() {
    const [products, setProducts] = useState([]);

    const router = useRouter()
    const {q} = router.query

    const Product = ({product}) =>{

        let click  = () =>{
            //window.alert("produto acessado !")
            localStorage.setItem('produto',JSON.stringify(product))
            document.getElementById('click_modal').click()
        }
  
        return(
          <div id='Product'>
              <div className="card"  style={{padding:"2%"}}>
                <img src={product.images[0]} class="card-img-top"  />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text" style={{fontSize:"120%",color:"darkcyan",fontWeight:"bolder"}}>R${product.price}</p>
                  <div  className="btn btn-primary" onClick={click}>Acessar Produto</div>
                </div>
              </div>
          </div>
        )
  
      }

    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    },[])

    useEffect(() => {
        console.log(q)
        if (q != null) {
            fetch(`/api/products/search?q=${q}`)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response['status'] == 'ok'){
                    setProducts(response['products'])
                }
            })
        }
    }, [q]);

    return (
        <div>
            <Head>
                <title>Pesquisa - {q}</title>
            </Head>
            <Header />
            <ProductModal />
            <h2 style={{textAlign:'center',marginTop:"2.5%"}}>Pesquisa - {q}</h2>

            <div id="list"  class="row row-cols-1 row-cols-md-3 g-4" style={{marginTop:"2.5%"}}>
                {products.map((p)=>(
                    <Product product={p} key={p._id}/>
                ))}
            </div>


        </div>
    );
}
