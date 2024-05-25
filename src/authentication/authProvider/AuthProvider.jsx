import { GoogleAuthProvider, createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    console.log(auth)
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const sentEmailVerify = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    const deletedUser = () => {
        return deleteUser(auth.currentUser)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            //jwt-------------------------------------------
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                axios.post('http://localhost:5000/jwt', userInfo)
                    .then(res => {
                        if (res?.data?.token) {
                            localStorage.setItem('access-token', res?.data?.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            //--------------------------------
            console.log("current user", currentUser)

        });
        return () => {
            return unSubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        signUp,
        logIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        sentEmailVerify,
        forgetPassword,
        deletedUser,



    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;