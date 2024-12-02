import { Products } from "../../MongoDB/products"

export default async function handler(req, res) {

  const response = {}

  try{

    const products = new Products()
    await products.startClient()
    const all_products = await products.getAllProducts()
    response['list'] = all_products
    response['status'] = 'ok'

  }catch(e){
    console.log(e)
    response['status'] = 'error'
  }


  res.json(response)
}
