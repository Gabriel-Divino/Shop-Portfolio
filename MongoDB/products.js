import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";


export class Products{

   client;
   db;

   async startClient(){
    
    this.client = await clientPromise;
    this.db  = this.client.db("Shop");
   }

   async getAllProducts(){

    let all_products = await this.db.collection("products").find({}).toArray();

    return all_products;

   }


   async getProductByCategory(category){

      let products = await this.db.collection("products").find({category:category}).toArray();

      return products

   }

   async getProductById(_id){

      let product = await this.db.collection("products").findOne({_id:ObjectId(_id)})

      return product
      
   }

   async updateProduct(_id,document){
      let product = await this.db.collection("products").updateOne({_id:ObjectId(_id)},{$set:document}) 
  }

   async searchForProducts(search_term){

      const terms = search_term.toLowerCase().split('.')
      console.log(terms)
      const products = await this.db.collection('products').find({
         tags: { $all: terms }
     }).toArray()

     return products

   }

   async reset_stock(){
      await this.db.collection("products").updateMany({},{$set:{stock:10}}) 
   }


};