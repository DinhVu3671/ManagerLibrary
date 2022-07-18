import { createContext, useEffect, useReducer } from "react";
import Reducer from "./AuthReducer.js"

const INITIAL_STATE = {
    token: JSON.parse(localStorage?.getItem('token')) || null,
    id: JSON.parse(localStorage?.getItem("id")) || null,
    fullName: JSON.parse(localStorage?.getItem("fullName")) || null,
    phone: JSON.parse(localStorage?.getItem("phone")) || null,
    role: JSON.parse(localStorage?.getItem("role")) || null,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [AuthState, AuthDispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(AuthState.token));
        localStorage.setItem('id', JSON.stringify(AuthState.id));
        localStorage.setItem('phone', JSON.stringify(AuthState.phone));
        localStorage.setItem('fullName', JSON.stringify(AuthState.fullName));
        localStorage.setItem('role', JSON.stringify(AuthState.role));
    }, [AuthState]);

    return (
        <AuthContext.Provider value={{
            AuthState,
            AuthDispatch
        }}>
            {children}
        </AuthContext.Provider>
    );

}