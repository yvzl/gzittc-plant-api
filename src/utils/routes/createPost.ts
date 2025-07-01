import type {IncomingMessage, ServerResponse} from 'http';
import {Crud, getBody, send, errHandler} from '../';
import type {IRoutes} from "../../types";

export const createPost = <K extends IRoutes, T extends Crud<K>>(initData: K) => {
    return {
        async single(dbCrud: T, req: IncomingMessage, res: ServerResponse) {
            await errHandler(res, async () => {
                const data = await getBody(req);
                console.log(data)
                const result = await dbCrud.postSingle({...initData, ...data});
                send(res, 200, result);
            })
        },
    }
}