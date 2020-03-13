/**
 * Handler functions for firestore methods
 */

import { firestore } from './firebase-config'
import {Log} from './logger'

export const getCollectionRef = (colName: string) => {
    return firestore.collection(colName)
}

export const getDocumentRef = (colName: string, docId: string) => {
    return firestore.doc(`${colName}/${docId}`);
}

export const getDocuments = async (colName: string) => {

    return await firestore.collection(colName)
        .get()
        .then((snaps: any) => {
            return snaps.docs.map((snap: any) => ({...snap.data(), id: snap.id}))
        })
        .catch((e: any) => {
            Log('error', e)
            throw new Error(e.message)
        })
}

export const getDocument = async (colName: string, docId: string) => {

    return await firestore.doc(`${colName}/${docId}`)
        .get()
        .then((snap: any) => ({...snap.data(), id: snap.id}))
        .catch((e: any) => {
            Log('error', e)
            throw new Error(e.message)
        });
}

export const insertDocument = async (colName: string, data: any) => {

    return await firestore.collection(colName).add({ ...data, createdAt: Date.now() })
        .then((res: any) => {
            Log('log', 'new document inserted: ', res.id)
            return res.id
        })
        .catch((e: any) => {
            Log('error', 'error while creating document in collection: ', colName);
            throw new Error(e.message)
        });
}

export const setDocument = async (colName: string, docId: string, data: any) => {

    return await firestore.doc(`${colName}/${docId}`)
        .set({ ...data, updated: Date.now()}, {merge: true })
        .then(() => Log('log', 'new document updated (set): '))
        .catch((e: any) => {
            Log('error', 'error while updating (setting) document: ', e)
        });
}

export const updateDocument = async (colName: string, docId: string, data: any) => {

    return await firestore.doc(`${colName}/${docId}`)
        .update({ ...data, updatedAt: Date.now()})
        .then(() => Log('log', 'new document updated: '))
        .catch((e: any) => {
            Log('error', 'error while updating document: ', e)
        });
}

export const deleteDocument = async (colName: string, docId: string) => {

    return await firestore.doc(`${colName}/${docId}`)
        .delete()
        .then(() => Log('info', 'One document deleted'))
}