import { createContext, useEffect, useReducer } from "react";
import Reducer from "./AuthReducer.js"

const INITIAL_STATE = {
    token: null,
    id: null,
    fullName: null,
    phone: null,
    role: null,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [AuthState, AuthDispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        sessionStorage.setItem("token", JSON.stringify(AuthState.token));
        sessionStorage.setItem("id", JSON.stringify(AuthState.id));
        sessionStorage.setItem("phone", JSON.stringify(AuthState.phone));
        sessionStorage.setItem("fullName", JSON.stringify(AuthState.fullName));
        sessionStorage.setItem("role", JSON.stringify(AuthState.role));
    }, [AuthState.token]);

    return (
        <AuthContext.Provider value={{
            AuthState,
            AuthDispatch
        }}>
            {children}
        </AuthContext.Provider>
    );

}