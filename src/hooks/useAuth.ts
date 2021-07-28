import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


//esse hook serve para diminuir o numero de importacoes
export function useAuth(){
    const value = useContext(AuthContext)

    return value;
}