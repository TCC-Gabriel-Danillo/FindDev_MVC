import {
    CollectionReference,
    DocumentData,
    query,
    where,
    Query,
    orderBy,
    startAt,
    endAt
} from 'firebase/firestore';
import { ORDER, QueryOptions } from '../repositories/database/types';


export const getRefFromArgs = (collection: CollectionReference<DocumentData>, options?: QueryOptions): Query<DocumentData> => {
    if (options?.filterArgs && options?.orderArgs) {
        const { field: filterField, op, value } = options.filterArgs
        const { field: orderField, order, startAt: start, entAt: end } = options.orderArgs
        return query(collection, where(filterField, op, value), orderBy(orderField, order || ORDER.ASC), startAt(start), endAt(end));
    }

    if (options?.filterArgs) {
        const { field: filterField, op, value } = options.filterArgs
        return query(collection, where(filterField, op, value));
    }

    if (options?.orderArgs) {
        const { field: orderField, order, startAt: start, entAt: end } = options.orderArgs
        return query(collection, orderBy(orderField, order), startAt(start), endAt(end));
    }

    return query(collection);
}

