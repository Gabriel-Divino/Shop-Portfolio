import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";


export class User{

    client;
    db;

    async startClient(){
    
        this.client = await clientPromise;
        this.db  = this.client.db("Shop");
    }

    async findUserById(_id){

        let user = await this.db.collection("users").findOne({_id:ObjectId(_id)})
        return user
    }


    async findUserByEmail(email){
        let user = await this.db.collection("users").findOne({email:email})
        return user
    }

    async createUser(document){

        let user  = await this.db.collection("users").insertOne(document)
        return user

    }

    async updateUser(_id,document){
        let user = await this.db.collection("users").updateOne({_id:ObjectId(_id)},{$set:document}) 
    }

    async RemoveFields(_id,document){
        await this.db.collection("users").updateOne({_id:ObjectId(_id)},{$unset:document}) 
    }




}

