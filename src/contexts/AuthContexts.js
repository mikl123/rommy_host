import { auth } from "../firebase";
import React, { useContext, useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
let navigate1 = useNavigate();

    const [currentUser, setCurrentUser] = useState(Object)
    const [loading, setLoading] = useState(true)
    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
            console.log(result)
            navigate1("/")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
