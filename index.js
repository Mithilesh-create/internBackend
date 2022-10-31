require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const url = process.env.DB_CONNECT;
const client = new MongoClient(url);

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
// Database Name
const dbName = process.env.DB_NAME;

async function main() {
  await client.connect();
  console.log("Connected successfully to server...");
  const db = client.db(dbName);
  const collection = db.collection(process.env.DB_COLLECTION_NAME);
  app.get("/", async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.status(200).send(findResult);
  });
  app.listen(port, () => {
    console.log(`server has started at port ${port}`);
  });
  return "done.";
}

main().then(console.log).catch(console.error);
