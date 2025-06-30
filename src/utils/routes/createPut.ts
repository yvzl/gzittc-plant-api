import type {IncomingMessage, ServerResponse} from 'http';
import {send, Crud, getBody} from '../';

export const createPut = <T extends Crud<any>>() => {
    return {
        async single(dbCrud: T, req: IncomingMessage, res: ServerResponse) {
            const {id, ...data} = await getBody(req);
            if (!id) return send(res, 400, {error: "id 为 null"})
            const result = await dbCrud.putSingle(id, data);
            send(res, 200, {result});
        },
    }
}