import axios from 'axios'
import { useReducer } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const ContextGlobal = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DATA_PRODUCTS':
            return { ...state, data: action.payload };
        case 'DATA_PRODUCTS_CATEGORIES':
            return { ...state, dataCategorias: action.payload };
        case 'DATA_USER':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            localStorage.removeItem("isLoged");
            localStorage.removeItem("loged");
            localStorage.removeItem("id");
            localStorage.removeItem("startDate");
            localStorage.removeItem("endDate");
            return { ...state, user: null, isLoged: false, loged: false };
        case 'USER_LOGED':
            localStorage.setItem("isLoged", JSON.stringify(true));
            return { ...state, isLoged: true };
        case 'ADMIN_LOGED':
            localStorage.setItem("loged", JSON.stringify(true));
            return { ...state, loged: true };
        case 'LOGIN_MENSAJE':
            return { ...state, loginMsj: true };
        default: return state
    }
}

const initialState = {
    data: [],
    dataCategorias: [],
    user: [],
    isLoged: JSON.parse(localStorage.getItem("isLoged")) || false,
    loged: JSON.parse(localStorage.getItem("loged")) || false,
    loginMsj: false,
}

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const url = "http://localhost:8080/admin/productos";

    useEffect(() => {
        axios(url)
            .then(res => dispatch({ type: 'DATA_PRODUCTS', payload: res.data }))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        axios(url)
            .then(res => dispatch({ type: 'DATA_PRODUCTS_CATEGORIES', payload: res.data }))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ContextGlobal.Provider value={{
            state, dispatch,
        }}>
            {children}
        </ContextGlobal.Provider>
    );
};

export default ContextProvider

export const useContextGlobal = () => useContext(ContextGlobal)
