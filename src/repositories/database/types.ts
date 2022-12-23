export enum ORDER {
    ASC = "asc",
    DESC = "desc"
}
export enum OP {
    EQ = "==",
    CONTAINS = "array-contains",
    IN = "in"
}
export interface FilterArgs<T = any> {
    field: string;
    op: OP;
    value: T
}

export interface OrderArgs<T = any> {
    field: string
    order?: ORDER
    startAt?: T;
    entAt?: T
}

export interface QueryOptions {
    filterArgs?: FilterArgs
    orderArgs?: OrderArgs
}

export interface DatabaseRepository {
    getAll<T>(args?: QueryOptions): Promise<T[]>
    createOrReplace(data: any, id?: string): Promise<void>
    update(data: any, id: string): Promise<void>
}