export enum ORDER {
    ASC = "asc",
    DESC = "desc"
}
export enum OP {
    EQ = "==",
    CONTAINS = "array-contains",
    IN = "in"
}
export interface FilterArgs {
    field: string;
    op: OP;
    value: any
}

export interface OrderArgs {
    field: string
    order?: ORDER
}

export interface QueryOptions {
    filterArgs?: FilterArgs
    orderArgs?: OrderArgs
}

export interface DatabaseRepository {
    getOneById<T>(id: string): Promise<T>
    getAll<T>(args?: QueryOptions): Promise<T[]>
    createOrReplace(data: any, id?: string): Promise<void>
    update(data: any, id: string): Promise<void>
    delete(id: string): Promise<void>
}