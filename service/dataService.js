import { collection, addDoc, query, getFirestore, onSnapshot, updateDoc, doc, Timestamp, arrayUnion } from "firebase/firestore";

const db = getFirestore();

const addDataToCollection =  async (table, data) => {
    try {
        await addDoc(collection(db, table), data);
    } catch (error) {
        error.massage += " function: addDataToCollection";
        throw error;
    }
}

const getAllCollectionDocs = async (table, onNext) => {
    const q = query(collection(db, table));
    try {
        return await onSnapshot(q, onNext);
    } catch (error) {
        error.massage += " function: getAllCollectionDocs";
        throw error;
    }
}

const updateDocMessages = async (table, docID, messageData) => {
    const docRef = doc(db, table, docID);
    try {
        await updateDoc(docRef, {
            messages: arrayUnion(messageData)
        });
    } catch (error) {
        error.massage += " function: updateDocData";
        throw error;
    }
}

const getDocMessages = async (table, docID, callback) => {
    const docRef = doc(db, table, docID);
    try {
        await onSnapshot(docRef, callback)
    } catch (error) {
        error.massage += " function: getDocMessages";
        throw error;
    }
}
 
export { addDataToCollection, getAllCollectionDocs, updateDocMessages, getDocMessages, Timestamp };