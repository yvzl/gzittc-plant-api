import type {IncomingMessage, ServerResponse} from 'http';
import {send, Crud, urlParse, errHandler} from '../';

export const createDelete = <T extends Crud<any>>() => {
    return {
        async single(dbCrud: T, req: IncomingMessage, res: ServerResponse) {
            await errHandler(res, async () => {
                const url = req.url ?? "/"
                const id = urlParse(url).searchParams.get('id');
                if (!id) return send(res, 400, {error: "id 为 null"})
                const result = await dbCrud.deleteSingle(id);
                send(res, 200, {result});
            })
        },
        async some(dbCrud: T, req: IncomingMessage, res: ServerResponse) {
            await errHandler(res, async () => {
                const url = req.url ?? "/"
                const ids = urlParse(url).searchParams.get('ids')?.split(',') || [];
                const result = await dbCrud.deleteSome(ids);
                send(res, 200, result);
            })
        }
    }
}