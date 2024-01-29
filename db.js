import { MongoClient } from "mongodb";

const connectionString =
  "mongodb+srv://stalin:stalin22@cluster0.ubvwzbg.mongodb.net";

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