import { ActivosContext } from "../context/ActivosContext";
import { useContext } from "react";

export const useActivosContext = () => {
    const context = useContext(ActivosContext);

    if (!context) throw Error('Bad context');

    return context;
};