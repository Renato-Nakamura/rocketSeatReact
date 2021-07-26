import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


//hooks servem para diminuir o numero de importacoes
export function useAuth(){
    const value = useContext(AuthContext)

    return value;
}