import { Products } from "../../../MongoDB/products"


export default async function handler(req,res){

    const response = {}


    try{
        const products = new Products()
        await products.startClient()
        const query = req.query.q

        const search_products = await products.searchForProducts(query)

        response['status'] = 'ok'
        response['products'] = search_products


    }catch(e){
        console.log(e)
        response['status'] = 'error'
    }

    res.json(response)


}