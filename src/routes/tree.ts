import {treeInit, prefix} from "../configs";
import {join} from "path"
import {Crud, createRouter, createGet, createPost, createDelete, createPut} from "../utils"
import {type Db} from "mongodb";
import type {ITree} from "../types"

const treeUrl = join(prefix, "tree")

class TreeCrud extends Crud<ITree> {
    constructor(db: Db, name: string) {
        super(db, name);
    }
}

const map = {
    GET: createGet<TreeCrud>(),
    POST: createPost<ITree, TreeCrud>(treeInit),
    DELETE: createDelete<TreeCrud>(),
    PUT: createPut<TreeCrud>()
};

export const tree = createRouter<TreeCrud>({
    base: treeUrl,
    map,
    crud: TreeCrud,
    collectionName: 'tree'
});