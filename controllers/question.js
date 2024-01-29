import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllQuestion() {
  return client.db("stackoverflow").collection("questions").find({}).toArray();
}

export function addQuestion(Quest) {
  return client.db("stackoverflow").collection("questions").insertOne(Quest);
}

export function updatedQuestion(id, Quest) {
  return client
    .db("stackoverflow")
    .collection("questions")
    .updateOne({ _id:new ObjectId(id) }, { $set: Quest });
}

export function deleteQuestion(id) {
  return client
    .db("stackoverflow")
    .collection("questions")
    .deleteOne({ _id:new ObjectId(id) });
}
