import http from "http"
import {connect} from "./db/connection"

const server = http.createServer((res, req) => {
    console.log(req)

})

server.listen(8000, async () => {
    const result = await connect()
    const collection = result.collection('exampleCollection');
    const doc = { name: "Example", type: "Test" };
    await collection.insertOne(doc);
})