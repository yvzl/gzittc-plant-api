import {prefix, areaInit} from "../configs";
import {join} from "path"
import {Crud, createRouter, createGet, createPost, createDelete, createPut} from "../utils"
import {type Db} from "mongodb";
import type {IArea} from "../types"

const areaUrl = join(prefix, "area")

class AreaCrud extends Crud<IArea> {
    constructor(db: Db, name: string) {
        super(db, name);
    }
}

const map = {
    GET: createGet<AreaCrud>(),
    POST: createPost<IArea, AreaCrud>(areaInit),
    DELETE: createDelete<AreaCrud>(),
    PUT: createPut<AreaCrud>()
};

export const area = createRouter<AreaCrud>({
    base: areaUrl,
    map,
    crud: AreaCrud,
    collectionName: 'area'
});