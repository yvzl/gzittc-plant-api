import type {ServerResponse} from "http";

export const send = (res: ServerResponse, code: number, data: {}) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.statusCode = code
    res.write(JSON.stringify({data}));
    res.end();
}