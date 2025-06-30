import type {IncomingMessage, ServerResponse} from 'http';
import {Crud, getBody, send, errHandler} from '../';
import type {IRoutes} from "../../types";

export const createPost = <K extends IRoutes, T extends Crud<K>>(initData: K) => {
    return {
        async single(dbCrud: T, req: IncomingMessage, res: ServerResponse) {
            await errHandler(res, async () => {
                const data = await getBody(req);
                const result = await dbCrud.postSingle(Object.assign(initData, data));
                send(res, 200, result);
            })
        },
    }
}