import {join} from "path";
import {imageDir} from "../configs";

export const imageJoin = (id: string) => join(imageDir, `${id}.jpg`);