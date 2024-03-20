import axios from 'axios'
import { useReducer } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const ContextGlobal = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DATA_PRODUCTS':
            return { ...state, data: action.payload };
        case 'DATA_PRODUCTS_ALEATORIA':
            return { ...state, dataAleatoria: action.payload };
        case 'DATA_USER':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            localStorage.removeItem("isLoged");
            localStorage.removeItem("loged");
            localStorage.removeItem("id");
            return { ...state, user: null, isLoged: false, loged: false };
        case 'USER_LOGED':
            localStorage.setItem("isLoged", JSON.stringify(true));
            return { ...state, isLoged: true };
        case 'ADMIN_LOGED':
            localStorage.setItem("loged", JSON.stringify(true));
            return { ...state, loged: true };
        default: return state
    }
}

const initialState = {
    data: [],
    dataAleatoria: [],
    user: [],
    isLoged: JSON.parse(localStorage.getItem("isLoged")) || false,
    loged: JSON.parse(localStorage.getItem("loged")) || false,
}

const aleatorio = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get('http://localhost:8080/admin/productos')
            .then(res => {
                const newData = res.data;
                dispatch({ type: 'DATA_PRODUCTS', payload: newData });
                // Actualizar state.dataAleatoria si hay cambios en state.data
                if (JSON.stringify(state.data) !== JSON.stringify(newData)) {
                    const newDataAleatoria = aleatorio(newData);
                    dispatch({ type: 'DATA_PRODUCTS_ALEATORIA', payload: newDataAleatoria });
                }
            })
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
