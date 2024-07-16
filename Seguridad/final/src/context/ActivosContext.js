import { createContext, useReducer } from "react";

export const ActivosContext = createContext();

export const activosReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return { activos: [action.payload, ...state.activos] };
        case 'SET':
            return { activos: action.payload };
        default:
            return state;
    }
};

export const ActivosContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(activosReducer, { activos: [] });

    return (
        <ActivosContext.Provider value={{...state, dispatch}}>
            {children}
        </ActivosContext.Provider>
    )
};