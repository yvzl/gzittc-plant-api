import fs from "fs/promises"
import {imageDir, prefix} from "../configs";
import {join} from "path"
import formidable from 'formidable';
import type {IncomingMessage, ServerResponse} from "http";
import {errHandler, urlParse, send, imageJoin} from "../utils";
import {Db, ObjectId} from "mongodb";

const imageUrl = join(prefix, "image")

const map = {
    GET: {
        single: (req: IncomingMessage, res: ServerResponse) => errHandler(res, async () => {
            const search = urlParse(req.url ?? '/').searchParams;
            const id = search.get('id');
            if (!id) return send(res, 400, { error: '无效的 id' });
            const filePath = imageJoin(id);
            try {
                const data = await fs.readFile(filePath);
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            } catch (err) {
                return send(res, 404, { error: '图片不存在' });
            }
        })
    },
    POST: {
        single: (req: IncomingMessage, res: ServerResponse) => errHandler(res, async () => {
            const form = formidable({
                uploadDir: imageDir,
                keepExtensions: true,
                allowEmptyFiles: false,
            });
            try {
                const [, files] = await form.parse(req);
                const uploadedFiles = files.file;
                if (!uploadedFiles || uploadedFiles.length === 0) return send(res, 400, { error: '未上传文件' });
                const file = uploadedFiles[0];
                const fileId = new ObjectId().toString();
                const newPath = imageJoin(fileId)
                await fs.rename(file.filepath, newPath);
                send(res, 200, { id: fileId });
            } catch (err) {
                console.error('文件上传失败:', err);
                send(res, 500, { error: '文件上传失败' });
            }
        })
    },
    DELETE: {
        single: (req: IncomingMessage, res: ServerResponse) => errHandler(res, async () => {
            const id = urlParse(req.url ?? '/').searchParams.get('id');
            if (!id) return send(res, 400, { error: 'id 为 null' });
            const filePath = imageJoin(id);
            try {
                await fs.unlink(filePath);
                send(res, 200, { result: "删除成功" });
            } catch (err) {
                return send(res, 404, { error: '图片不存在' });
            }
        })
    },
};

export const image = async (_: Db, req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? '';
    if (!(method in map)) return false;
    let urlPath = urlParse(req.url ?? '/').pathname;
    const routes = map[method as keyof typeof map];
    for (const key in routes) {
        const expectedPath = join(imageUrl, key);
        if (expectedPath === join(urlPath)) {
            await routes[key as keyof typeof routes](req, res);
            return true;
        }
    }
    return false;
}