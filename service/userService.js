import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut,
         onAuthStateChanged,
         updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const createUser = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        error.message += " function: createUser";
        throw error;
    }
}

const signInUser = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        error.message += " function: signInUser";
        throw error;
    }
}

const signOutUser = async () => {
    try {
        return await signOut(auth);
    } catch (error) {
        error.message += " function: signInUser";
        throw error;
    }
}

const userAuthStateChange = async () => {
    try {
        return await onAuthStateChanged(auth);
    } catch (error) {
        error.message += " function: onAuthStateChanged";
        throw error;
    }
}

const updateUserData = async (user) => {
    try {
        await updateProfile(auth.currentUser, user);
    } catch (error) {
        error.message += " function: updateUserData";
        throw error;
    }
}

export { createUser, signInUser, signOutUser, userAuthStateChange, updateUserData, auth };