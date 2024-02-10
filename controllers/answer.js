import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllAnswer() {
  return client.db("stackoverflow").collection("answers").find({}).toArray();
}

export function addAnswer(Answ) {
  return client.db("stackoverflow").collection("answers").insertOne(Answ);
}

export function updatedAnswer(id, Answ) {
  return client
    .db("stackoverflow")
    .collection("answers")
    .updateOne({ _id:new ObjectId(id) }, { $set: Answ });
}

export function deleteAnswer(id) {
  return client
    .db("stackoverflow")
    .collection("answers")
    .deleteOne({ _id:new ObjectId(id) });
}

export function showAnswer(qid) {
  return client.db("stackoverflow").collection("answers").find({quesId:qid}).toArray();
}