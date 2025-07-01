import type {IncomingMessage, ServerResponse} from 'http';
import {Crud, send, urlParse, errHandler} from '../';

export const createGet = <T extends Crud<any>>() => {
    return {
        single: (dbCrud: T, req: IncomingMessage, res: ServerResponse) =>
            errHandler(res, async () => {
                const url = req.url ?? '/';
                const id = urlParse(url).searchParams.get('id');
                if (!id) return send(res, 400, {error: 'id 为 null'});
                const result = await dbCrud.getSingle(id);
                if (!result) return send(res, 400, {error: 'id 不存在'});
                send(res, 200, result);
            }),
        some: (dbCrud: T, req: IncomingMessage, res: ServerResponse) =>
            errHandler(res, async () => {
                const url = req.url ?? '/';
                const ids = urlParse(url).searchParams.get('ids')?.split(',') ?? [];
                const result = await dbCrud.getSome(ids);
                send(res, 200, result);
            }),
        all: (dbCrud: T, req: IncomingMessage, res: ServerResponse) =>
            errHandler(res, async () => {
                const result = await dbCrud.getAll();
                send(res, 200, result);
            }),
        field: (dbCrud: T, req: IncomingMessage, res: ServerResponse) =>
            errHandler(res, async () => {
                const url = req.url ?? '/';
                const search = urlParse(url).searchParams;
                const field = search.get('field');
                const value = search.get('value');
                if (!field || !value) return send(res, 400, {error: 'field 或 value 为 null'});
                const result = await dbCrud.getField(field as keyof T, value);
                send(res, 200, result);
            })
    }
}