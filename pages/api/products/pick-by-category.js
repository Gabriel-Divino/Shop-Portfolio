import { Products } from "../../../MongoDB/products"


export default async function handler(req,res){


    const response = {}

    try{

        const products = new Products()
        await products.startClient()

        const category = req.query.category
        const get_products_by_category = await products.getProductByCategory(category);

        response['status'] = 'ok'
        response['products'] = get_products_by_category

    }catch(e){
        console.log(e)
        response['status'] = 'error'

    }


    res.json(response)

}