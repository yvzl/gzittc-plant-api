import http from "http"
import {connect} from "./db/connection"
import {port} from "./configs"
import routes from "./routes"
import {send} from "./utils";

const server = http.createServer(async (req, res) => {
    const db = await connect()
    for (const key of routes) {
        const result = await key(db, req, res)
        if (result) return
    }
    send(res, 400, {error: "接口不存在"})
})

server.listen(port, async () => {
    console.log("Server started on port", port)
})