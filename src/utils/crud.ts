import {
    type Db,
    type Collection,
    type Filter,
    type WithId,
    type MatchKeysAndValues,
    type OptionalUnlessRequiredId,
    ObjectId
} from 'mongodb';
import type {IRoutes} from "../types"

export abstract class Crud<
    T extends IRoutes,
    TCreate = Omit<T, '_id'>,
    TUpdate = Partial<Omit<T, '_id'>>
> {
    protected collection: Collection<T>;

    protected constructor(db: Db, collectionName: string) {
        this.collection = db.collection<T>(collectionName);
    }

    public async getSingle(id: string): Promise<WithId<T> | null> {
        try {
            return await this.collection.findOne({_id: new ObjectId(id)} as Filter<T>);
        } catch (err) {
            throw err;
        }
    }

    public async getSome(ids: string[]): Promise<WithId<T>[]> {
        try {
            return await this.collection.find({_id: {$in: ids.map(id => new ObjectId(id))}} as Filter<T>).toArray();
        } catch (err) {
            throw err;
        }
    }

    public async getField(field: keyof T, value: any): Promise<WithId<T>[]> {
        try {
            return await this.collection.find({[field]: value} as Filter<T>).toArray();
        } catch (err) {
            throw err;
        }
    }

    public async getAll(): Promise<WithId<T>[]> {
        try {
            return await this.collection.find().toArray();
        } catch (err) {
            throw err;
        }
    }

    public async postSingle(data: TCreate): Promise<T> {
        try {
            const result = await this.collection.insertOne(data as OptionalUnlessRequiredId<T>);
            return {
                ...data,
                _id: result.insertedId,
            } as unknown as T;
        } catch (err) {
            throw err
        }
    }

    public async putSingle(id: string, data: MatchKeysAndValues<TUpdate>): Promise<string> {
        try {
            const result = await this.collection.updateOne(
                {_id: new ObjectId(id)} as Filter<T>,
                {$set: data as MatchKeysAndValues<T>}
            );
            return result.modifiedCount > 0 ? "修改成功" : "修改失败"
        } catch (err) {
            throw err
        }
    }

    public async deleteSingle(id: string): Promise<string> {
        try {
            const result = await this.collection.deleteOne({_id: new ObjectId(id)} as Filter<T>);
            return result.deletedCount > 0 ? "删除成功" : "删除失败";
        } catch (err) {
            throw err
        }
    }

    public async deleteSome(ids: string[]): Promise<string> {
        try {
            const result = await this.collection.deleteMany({_id: {$in: ids.map(id => new ObjectId(id))}} as Filter<T>);
            return `成功删除${result.deletedCount}条数据`;
        } catch (err) {
            throw err
        }
    }
}