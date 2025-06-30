import {treeLevelInit, prefix} from "../configs";
import {join} from "path"
import {Crud, createRouter, createGet, createPost, createDelete, createPut} from "../utils"
import {type Db} from "mongodb";
import type {ITreeLevel} from "../types"

const treeLevelUrl = join(prefix, "tree")

class TreeLevelCrud extends Crud<ITreeLevel> {
    constructor(db: Db, name: string) {
        super(db, name);
    }
}

const map = {
    GET: createGet<TreeLevelCrud>(),
    POST: createPost<ITreeLevel, TreeLevelCrud>(treeLevelInit),
    DELETE: createDelete<TreeLevelCrud>(),
    PUT: createPut<TreeLevelCrud>()
};

export const treeLevel = createRouter<TreeLevelCrud>({
    base: treeLevelUrl,
    map,
    crud: TreeLevelCrud,
    collectionName: 'tree_level'
});