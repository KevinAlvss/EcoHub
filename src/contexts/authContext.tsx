import { createContext, useState, ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

type AuthContextProviderProps = {
    children: ReactNode;
}

type AuthContextData = {
    token: string | undefined;
    login: (email: string, password: string) => void;
    logOut: () => void;
    checkLogin: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({children}: AuthContextProviderProps){
    const navigate = useNavigate();

    const [token, setToken] = useState(window.sessionStorage.getItem("token") || "");

    const login = (email: string, password: string) => {
        setToken(`${email} - ${password}`);
        window.sessionStorage.removeItem("token");
        window.sessionStorage.setItem("token", token);
    }

    const logOut = () => {
        setToken("");
        window.sessionStorage.removeItem("token");
        navigate("/login");
      };

    const checkLogin = () => {
        if(!token){
            navigate("/login");
        }
    };

    return(
        <AuthContext.Provider value={{
            token,
            login,
            logOut,
            checkLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
}