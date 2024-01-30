import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString =process.env.MONGO_URL;
console.log(connectionString);
async function dbConnection() {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
    console.log("Database Connected");
    return client;
  } catch (error) {
    console.log("Error Occured", error);
  }
}

export const client = await dbConnection();