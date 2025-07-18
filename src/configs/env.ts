import 'dotenv/config';
import {join} from "path";
import {__dirname} from "../utils";

export const url = process.env.DB_URL ?? "mongodb://localhost:27017";
export const port = process.env.PORT ?? "8000"
export const dbName = process.env.DB_NAME ?? "tree_db";
export const prefix = process.env.ROUTER_PREFIX ?? "/api/v1";
export const imageDir = join(__dirname(), "../../public/images")