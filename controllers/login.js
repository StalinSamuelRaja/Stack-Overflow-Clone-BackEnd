// import { client } from "../db.js";

// export function registerUser(data){
// return client.db("stackoverflow").collection("user").insertOne(data)
// }

// export function getUser(userEmail){
//     return client.db("stackoverflow").collection("user").findOne({email:userEmail})
// }
import { User } from "../schema/user.js";


export async  function  getuser(req){
    return User.findOne({email:req.body.email})
}

export function NewUser(user){
    return new User(user).save()
}

export function getuserbyActivatetoken(token){
    return User.findOne({activetoken:token})
}