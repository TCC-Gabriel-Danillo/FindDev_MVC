import {
    getFirestore,
    setDoc,
    doc,
    Firestore,
    getDocs,
    updateDoc,
} from 'firebase/firestore';

import {
    parseFirebaseSnapshot,
    parseCollection,
    getRefFromArgs
} from "_/helpers"

import { DatabaseRepository, QueryOptions } from './types';
export class DatabaseRepositoryImp implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private readonly collections: string[]

    constructor(...collections: string[]) {
        this.collections = collections
    }

    get collection() {
        return parseCollection(this.collections, this.firestore)
    }
    async getAll<T>(args?: QueryOptions): Promise<T[]> {
        const docsRef = getRefFromArgs(this.collection, args);
        const docsSnap = await getDocs(docsRef)
        return parseFirebaseSnapshot<T>(docsSnap)
    }

    async createOrReplace(data: any, id?: string) {
        await setDoc(doc(this.collection, id), data)
    }

    async update(data: any, id: string): Promise<void> {
        await updateDoc(doc(this.collection, id), data)
    }
}

