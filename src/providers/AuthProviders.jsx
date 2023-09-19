import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        return signOut(auth);
    }
    const userEmailVerification = (user) => {
       return sendEmailVerification(user);
    }
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        const usubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return usubscribe();
        }
    }, [])
    const [user, setUser] = useState(null)
    const authInfo = { user, loading, createUser, loginUser, logOut, userEmailVerification,forgetPassword }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;