import { Products } from "../../../MongoDB/products"




export default async function handler(req,res){


    try{

        const product_instance = new Products()
        await product_instance.startClient()
        await product_instance.reset_stock()

    }catch(e){


    }
    
    res.json({'status':'ok'})

}