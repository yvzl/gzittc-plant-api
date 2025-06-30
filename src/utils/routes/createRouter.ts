import {type Db} from 'mongodb';
import {type IncomingMessage, type ServerResponse} from 'http';
import {join} from 'path';
import {urlParse} from "../"

interface ICreateRouterOptions<T> {
    base: string;
    map: any;
    crud: new (db: Db, name: string) => T;
    collectionName: string;
}

export const createRouter = <T>({base, map, crud, collectionName}: ICreateRouterOptions<T>) => {
    return async (db: Db, req: IncomingMessage, res: ServerResponse): Promise<boolean> => {
        const method = req.method ?? '';
        if (!(method in map)) return false;
        let urlPath = urlParse(req.url ?? '/').pathname;
        const dbCrud = new crud(db, collectionName);
        const routes = map[method as keyof typeof map];
        for (const key in routes) {
            const expectedPath = join(base, key);
            if (expectedPath === join(urlPath)) {
                await routes[key](dbCrud, req, res);
                return true;
            }
        }
        return false;
    };
}