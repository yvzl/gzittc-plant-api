import {MongoClient} from "mongodb"
import 'dotenv/config';

const url = process.env.DB_URL ?? "mongodb://localhost:27017";
const dbName = process.env.DB_NAME ?? "mongodb";
const client = new MongoClient(url);

const connect = async () => {
    await client.connect();
    console.log("Connected");
    return client.db(dbName)
}

export {client, connect}