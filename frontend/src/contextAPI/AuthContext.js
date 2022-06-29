import { createContext, useEffect, useReducer } from "react";
import Reducer from "./AuthReducer.js"

const INITIAL_STATE = {
    token: JSON.parse(sessionStorage.getItem("token")) || null,
    id: JSON.parse(sessionStorage.getItem("id")) || null,
    username: JSON.parse(sessionStorage.getItem("username")) || null,
    phone: JSON.parse(sessionStorage.getItem("phone")) || null,
    role: JSON.parse(sessionStorage.getItem("role")) || null,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        sessionStorage.setItem("token", JSON.stringify(state.token));
        sessionStorage.setItem("id", JSON.stringify(state.id));
        sessionStorage.setItem("username", JSON.stringify(state.username));
        sessionStorage.setItem("phone", JSON.stringify(state.phone));
        sessionStorage.setItem("role", JSON.stringify(state.role));
    }, [state.token]);

    return (
        <AuthContext.Provider value={{
            token: state.token,
            error: state.error,
            id: state.id,
            username: state.username,
            phone: state.phone,
            role: state.role,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );

}