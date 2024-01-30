import { client } from "../db.js";

export function registerUser(data){
return client.db("stackoverflow").collection("user").insertOne(data)
}

export function getUser(userEmail){
    return client.db("stackoverflow").collection("user").findOne({email:userEmail})
}