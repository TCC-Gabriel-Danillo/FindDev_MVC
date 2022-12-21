import { DatabaseRepository, QueryOptions } from "_/repositories"

export class DatabaseRepositoryStub implements DatabaseRepository {
    getOneById<T>(id: string): Promise<T> {
        return Promise.resolve({} as T)
    }
    getAll<T>(args?: QueryOptions | undefined): Promise<T[]> {
        return Promise.resolve([])
    }
    createOrReplace(data: any, id?: string | undefined): Promise<void> {
        return Promise.resolve()
    }
    update(data: any, id: string): Promise<void> {
        return Promise.resolve()
    }
    delete(id: string): Promise<void> {
        return Promise.resolve()
    }
}