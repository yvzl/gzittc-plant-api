import http from "http"
// import {connect} from "./db/connection"
import {port} from "./configs"

const server = http.createServer((res, req) => {
    console.log(req)
})

server.listen(port, async () => {
    // const result = await connect()
    // const collection = result.collection('exampleCollection');
    // const doc = { name: "Example", type: "Test" };
    // await collection.insertOne(doc);
})