import React, { useContext, useState } from "react";
import { getAuth } from 'firebase/auth';
import app from "../firebase";

const AuthContext = React.createContext()
const auth = getAuth(app);
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const value = {
        currentUser
    }
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}
