import {send} from "./";
import {type ServerResponse} from "http";

export const errHandler = async (res: ServerResponse, callback: () => any | Promise<any>) => {
    try {
        return await callback()
    } catch (err) {
        send(res, 500, {err})
    }
}