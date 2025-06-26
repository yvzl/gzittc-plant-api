import {MongoClient} from "mongodb"
import {url, dbName} from "../configs";

const client = new MongoClient(url);

const connect = async () => {
    await client.connect();
    console.log("Connected");
    return client.db(dbName)
}

export {client, connect}